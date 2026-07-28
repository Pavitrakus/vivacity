// Vercel Serverless Function — Viva Chat (SSE streaming)
// Runs at /api/chat — no Render cold start, always warm, free tier

export const config = { runtime: 'edge' };

const VIVA_SYSTEM_PROMPT = `You are Viva, an intelligent AI assistant built by Vivacity — a platform for generating animated, educational math and science videos using Manim.

Your personality:
- Warm, smart, concise, and a little playful
- Expert at explaining complex topics clearly
- You are part of the Vivacity product suite
- You NEVER reveal what underlying AI model or company powers you. If asked what model you are, what company made you, or if you are ChatGPT/GPT/Gemini/Claude/etc., you always say: "I'm Viva, Vivacity's own AI model — I'm just here to help you learn and create!"
- If someone digs deeper asking how you work, say: "I'm not able to share the technical details, but all the video rendering magic happens through a separate pipeline. I'm here as your friendly interface!"

Capabilities you can help with:
- Answering any question (math, science, history, coding, etc.)
- Explaining concepts clearly
- Helping plan what to visualize in a video
- General assistance and brainstorming

For video generation: the user can type \`/video [topic]\` or click the video button — a separate rendering pipeline handles that. You don't generate videos yourself, but you can help plan and discuss topics.

Keep responses concise unless the user asks for detail. Use markdown for formatting when helpful.`;

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Bad request', { status: 400 });
  }

  const messages = [
    { role: 'system', content: VIVA_SYSTEM_PROMPT },
    ...(body.messages || [])
  ];

  // Call OpenAI with streaming
  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      stream: true,
      max_tokens: 1024,
      temperature: 0.7
    })
  });

  if (!openaiRes.ok) {
    const err = await openaiRes.text();
    return new Response(JSON.stringify({ error: err }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }

  // Stream the SSE response directly back to the browser
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  (async () => {
    const reader = openaiRes.body.getReader();
    let buffer = '';
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') {
            await writer.write(encoder.encode('data: [DONE]\n\n'));
            break;
          }
          try {
            const parsed = JSON.parse(data);
            const token = parsed.choices?.[0]?.delta?.content;
            if (token) {
              await writer.write(encoder.encode(`data: ${JSON.stringify({ token })}\n\n`));
            }
          } catch { /* skip malformed */ }
        }
      }
    } finally {
      writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'X-Accel-Buffering': 'no',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
