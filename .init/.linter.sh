#!/bin/bash
cd /home/kavia/workspace/code-generation/techgear-e-commerce-platform-215921-215932/ecommerce_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

