@echo off

:: Check if conda is installed
where conda >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Conda is not installed. Please install Miniconda or Anaconda first.
    exit /b 1
)

:: Create conda environment
conda create -n skin-disease-env python=3.9 -y

:: Activate conda environment
call conda activate skin-disease-env

:: Install requirements
pip install -r requirements.txt

:: Run the server
uvicorn app.main:app --reload 