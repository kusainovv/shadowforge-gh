# 🔹 Step 1: Build the frontend
FROM node:18-alpine AS frontend-builder

# Set the working directory
WORKDIR /app

# Copy only necessary files (for better caching)
COPY src/frontend/package.json src/frontend/package-lock.json ./
RUN npm ci

# Copy the full frontend source and build
COPY src/frontend /app
RUN npm run build

# 🔹 Step 2: Build the backend and serve frontend
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

# Set timezone
ENV TZ=UTC

# Set working directory
WORKDIR /app

# Install necessary dependencies
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
    build-essential \
    curl \
    npm \
    git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy backend source code
COPY . /app

# Ensure `uv` dependencies are installed
RUN uv sync --frozen

# Ensure `prod.start.sh` has execution permission
RUN chmod +x ./docker/prod.start.sh

# Copy built frontend files from the previous stage
# Install dependencies using uv
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=README.md,target=README.md \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    --mount=type=bind,source=src/backend/base/README.md,target=src/backend/base/README.md \
    --mount=type=bind,source=src/backend/base/uv.lock,target=src/backend/base/uv.lock \
    --mount=type=bind,source=src/backend/base/pyproject.toml,target=src/backend/base/pyproject.toml \
    uv sync --frozen --no-install-project --no-dev

# Expose necessary ports
EXPOSE 7860

# Start the backend in production mode
CMD ["./docker/prod.start.sh"]