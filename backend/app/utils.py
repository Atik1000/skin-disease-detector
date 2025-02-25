import torch
import torchvision.transforms as transforms
from PIL import Image
from typing import Tuple
from io import BytesIO

# Define disease classes
DISEASE_CLASSES = [
    "Acne",
    "Eczema",
    "Melanoma",
    "Psoriasis",
    "Rosacea"
]

# Define recommendations for each disease
RECOMMENDATIONS = {
    "Acne": "Keep your face clean and avoid touching it frequently. Consider using benzoyl peroxide products.",
    "Eczema": "Use a moisturizer and avoid triggers. Consult a dermatologist for proper treatment.",
    "Melanoma": "Urgent: Please consult a dermatologist immediately for proper evaluation.",
    "Psoriasis": "Use moisturizing creams and consider phototherapy. Consult a specialist for treatment options.",
    "Rosacea": "Avoid triggers like sun exposure and spicy foods. Use gentle skincare products."
}

def load_model() -> torch.nn.Module:
    """
    Load the pretrained model
    """
    try:
        import os
        model_path = "model/model.pth"
        if not os.path.exists(model_path):
            # Create a dummy model if no model exists
            from .model import create_dummy_model
            os.makedirs("model", exist_ok=True)
            create_dummy_model()
        
        model = torch.load(model_path)
        model.eval()
        return model
    except Exception as e:
        raise RuntimeError(f"Failed to load model: {str(e)}")

def preprocess_image(image_bytes: BytesIO) -> torch.Tensor:
    """
    Preprocess the input image
    """
    try:
        # Open image
        image = Image.open(image_bytes).convert('RGB')
        
        # Define transforms
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225]
            )
        ])
        
        # Apply transforms
        image_tensor = transform(image)
        return image_tensor.unsqueeze(0)  # Add batch dimension
    except Exception as e:
        raise ValueError(f"Failed to process image: {str(e)}")

def predict_disease(model: torch.nn.Module, image_tensor: torch.Tensor) -> Tuple[str, float, str]:
    """
    Make prediction using the model
    """
    try:
        with torch.no_grad():
            outputs = model(image_tensor)
            probabilities = torch.nn.functional.softmax(outputs, dim=1)
            confidence, predicted = torch.max(probabilities, 1)
            
            disease_name = DISEASE_CLASSES[predicted.item()]
            confidence_score = confidence.item()
            recommendation = RECOMMENDATIONS[disease_name]
            
            return disease_name, confidence_score, recommendation
    except Exception as e:
        raise RuntimeError(f"Failed to make prediction: {str(e)}") 