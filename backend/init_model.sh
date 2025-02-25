#!/bin/bash

# Activate the environment (use appropriate command based on your setup)
source venv/bin/activate  # for venv
# OR
# conda activate skin-disease-env  # for conda

# Create necessary directories
mkdir -p model
mkdir -p app/__pycache__

# Run the model creation script
python app/model.py

echo "Model initialization complete!" 