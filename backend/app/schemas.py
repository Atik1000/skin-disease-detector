from pydantic import BaseModel, Field

class PredictionResponse(BaseModel):
    disease_name: str = Field(..., description="Predicted skin disease name")
    confidence: float = Field(..., ge=0, le=1, description="Confidence score of the prediction")
    recommendation: str = Field(..., description="Recommended action based on prediction")

    class Config:
        json_schema_extra = {
            "example": {
                "disease_name": "Eczema",
                "confidence": 0.92,
                "recommendation": "Use a moisturizer and consult a dermatologist."
            }
        } 