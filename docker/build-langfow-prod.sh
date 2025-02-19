#!/bin/bash

# Ensure the script runs from the correct directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.." || { echo "❌ Error: Failed to navigate to project root."; exit 1; }

# Build the Production LangFlow Image
docker build \
  --build-arg PYTHONDONTWRITEBYTECODE=1 \
  --build-arg LANGFLOW_DATABASE_URL="postgresql://langflow:langflow@postgres:5432/langflow" \
  --build-arg LANGFLOW_CONFIG_DIR="/var/lib/langflow" \
  --build-arg LANGFLOW_SUPERUSER="shadowforge" \
  --build-arg LANGFLOW_SUPERUSER_PASSWORD="shadowforge" \
  --build-arg BACKEND_URL="http://backend-service:7860" \
  --build-arg LANGFLOW_AUTO_LOGIN="false" \
  --build-arg LANGFLOW_SECRET_KEY="shadowforge" \
  --build-arg LANGFLOW_NEW_USER_IS_ACTIVE="false" \
  -t langflow-prod -f docker/prod.Dockerfile .

# Success Message
if [ $? -eq 0 ]; then
    echo "✅ LangFlow production image built successfully!"
else
    echo "❌ Build failed. Check the error logs above."
fi