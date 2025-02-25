import torch
import torch.nn as nn

class SkinDiseaseModel(nn.Module):
    def __init__(self, num_classes=5):
        super(SkinDiseaseModel, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=2, stride=2),
        )
        self.classifier = nn.Sequential(
            nn.Linear(128 * 56 * 56, 512),
            nn.ReLU(inplace=True),
            nn.Dropout(),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = torch.flatten(x, 1)
        x = self.classifier(x)
        return x

# Create and save a dummy model
def create_dummy_model():
    model = SkinDiseaseModel()
    model.eval()
    # Save the model
    torch.save(model, 'model/model.pth')

if __name__ == "__main__":
    # Create model directory if it doesn't exist
    import os
    os.makedirs('model', exist_ok=True)
    create_dummy_model() 