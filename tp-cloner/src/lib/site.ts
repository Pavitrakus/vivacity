export const SITE_URL = "https://tryvivacity.com";
export const SITE_NAME = "Vivacity";
export const SITE_EMAIL = "help@tryvivacity.com";
export const SITE_TAGLINE = "Simulation runtime for AI agents.";
export const SITE_DESCRIPTION =
  "Vivacity is an executable simulation runtime for AI agents. A common interface to instantiate a world, inspect its state, take actions, fork alternatives, route each branch to the appropriate simulator or world model, verify outcomes, and render observations. We do not train a foundation world model. We make many simulators and world models usable as one system.";

export const SITE_KEYWORDS = [
  "Vivacity",
  "tryvivacity",
  "simulation runtime",
  "AI agents",
  "world state",
  "agent infrastructure",
  "fork simulate rollback",
  "execution layer",
  "physics simulation API",
  "world model interface",
  "developer infrastructure",
  "Y Combinator",
] as const;

export const TEAM = [
  {
    name: "Aditya Bhatia",
    role: "CEO · Systems",
    note: "IIT Kanpur. Cryptography research, CUDA systems work, runtime architecture.",
  },
  {
    name: "Tanish Anand",
    role: "CTO · Research",
    note: "IIT Kanpur. Reasoning stacks, discrete diffusion, simulation infrastructure.",
  },
  {
    name: "Pavitra Kushwaha",
    role: "CPO · Pipelines",
    note: "IIT Kanpur. Production pipelines, product systems, MPC research.",
  },
] as const;

export const FAQS = [
  {
    q: "What is Vivacity?",
    a: "A simulation runtime for AI agents. One interface to create a world, inspect state, act, fork alternatives, route those branches to the right simulator or world model, verify what happened, and render an observation if someone needs to see it.",
  },
  {
    q: "Are you a world-model company?",
    a: "No. World Labs, Genie, Cosmos and others attack generation and physical modelling. Vivacity sits around those systems. Production agents will not use one world model for every problem. Different worlds need different correctness, latency, and cost. We provide the state and action layer that routes each execution.",
  },
  {
    q: "Is the general runtime already in production?",
    a: "Not as a universal platform. We shipped a structured scientific execution engine far enough to run demos and customer integrations. That work exposed the missing abstraction: persistent, branchable state underneath the render. The runtime is what we are building with design partners now.",
  },
  {
    q: "How is this different from generating another video or world?",
    a: "Generation answers “what might this look like?” Execution answers “what happens if this variable changes?” If increasing a satellite’s velocity by 10% requires regenerating an output from scratch, there was no world underneath the pixels. State is what is true. Observation is what somebody sees.",
  },
  {
    q: "Who is this for?",
    a: "Teams building agents, robotics systems, scientific tools, autonomous stacks, and other products where a model needs somewhere to act, test outcomes, and keep persistent state. Early users are more likely to be AI-native startups than hyperscalers.",
  },
  {
    q: "Can I sign up or get an API key?",
    a: "Not yet. There is no self-serve product. If this layer belongs in your stack, book a demo and we will decide together whether a design-partner engagement makes sense.",
  },
  {
    q: "What does the interface look like?",
    a: "create, observe, act, simulate, fork, rollback, verify, commit, render. Domain schemas and backend adapters sit underneath. Orbital mechanics, circuits, and chemistry do not share one giant state object. They share a branchable transition.",
  },
  {
    q: "What should I not expect?",
    a: "Do not expect a custom foundation world model, a claim that generative video is physics, or a finished universal environment. Those are not the company.",
  },
] as const;
