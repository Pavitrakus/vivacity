# Lightweight Python base — we install only what Manim actually needs
FROM python:3.12-slim

# System dependencies: FFmpeg, Cairo, Pango, pkg-config, LaTeX (TeX Live minimal)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    libcairo2-dev \
    libpango1.0-dev \
    pkg-config \
    python3-dev \
    build-essential \
    texlive-latex-base \
    texlive-fonts-recommended \
    texlive-latex-extra \
    dvisvgm \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Working directory
WORKDIR /app

# Install Python deps (manim + our app deps)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source
COPY *.py ./

# Output videos directory
RUN mkdir -p outputs && chmod 777 outputs

# Expose port (Render sets $PORT automatically)
EXPOSE 8000

# Start FastAPI robustly
CMD ["sh", "-c", "python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
