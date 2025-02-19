#!/bin/bash

# Ensure the script is run from the correct directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.." || { echo "❌ Error: Failed to navigate to project root."; exit 1; }

# Load environment variables from .env file
if [ -f ".env" ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo "⚠️ Warning: .env file not found! Make sure to set environment variables manually."
fi

# Build LangFlow Image
docker build \
  --build-arg PYTHONDONTWRITEBYTECODE=$PYTHONDONTWRITEBYTECODE \
  --build-arg LANGFLOW_DATABASE_URL=$LANGFLOW_DATABASE_URL \
  --build-arg LANGFLOW_SUPERUSER=$LANGFLOW_SUPERUSER \
  --build-arg LANGFLOW_SUPERUSER_PASSWORD=$LANGFLOW_SUPERUSER_PASSWORD \
  --build-arg LANGFLOW_CONFIG_DIR=$LANGFLOW_CONFIG_DIR \
  -t dev-langflow -f docker/dev.Dockerfile .

# Success Message
if [ $? -eq 0 ]; then
    echo "✅ LangFlow image built successfully!"
else
    echo "❌ Build failed. Check the error logs above."
fi