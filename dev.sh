#!/bin/bash

# Start backend
cd backend
source venv/bin/activate  # or conda activate skin-disease-env
uvicorn app.main:app --reload &

# Start frontend
cd ..
npm start 