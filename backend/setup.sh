#!/bin/bash

# Install pyenv if not already installed (on Ubuntu/Debian)
if ! command -v pyenv &> /dev/null; then
    curl https://pyenv.run | bash
    export PATH="$HOME/.pyenv/bin:$PATH"
    eval "$(pyenv init -)"
fi

# Install Python 3.9 using pyenv
pyenv install 3.9.0
pyenv local 3.9.0

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload 