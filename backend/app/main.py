from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .schemas import PredictionResponse
from .utils import preprocess_image, load_model, predict_disease
import io

app = FastAPI(
    title="Skin Disease Detection API",
    description="API for detecting skin diseases using deep learning",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
model = load_model()

@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)):
    """
    Predict skin disease from uploaded image
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(400, detail="File must be an image")
    
    try:
        # Read image file
        contents = await file.read()
        image = preprocess_image(io.BytesIO(contents))
        
        # Make prediction
        disease_name, confidence, recommendation = predict_disease(model, image)
        
        return PredictionResponse(
            disease_name=disease_name,
            confidence=confidence,
            recommendation=recommendation
        )
    except Exception as e:
        raise HTTPException(500, detail=str(e))

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy"} 