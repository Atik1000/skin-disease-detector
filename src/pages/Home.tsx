import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  CircularProgress,
} from '@mui/material';
import { PhotoCamera, Upload } from '@mui/icons-material';
import ImageUpload from '../components/ImageUpload';
import CameraCapture from '../components/CameraCapture';
import ResultsDisplay from '../components/ResultsDisplay';

interface ScanResult {
  disease: string;
  confidence: number;
  recommendations: string[];
}

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [results, setResults] = useState<ScanResult | null>(null);

  const handleImageUpload = async (imageData: string) => {
    setLoading(true);
    try {
      // TODO: Implement API call to backend
      // Mock response for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      setResults({
        disease: "Sample Condition",
        confidence: 0.89,
        recommendations: [
          "Consult a dermatologist",
          "Keep the area clean and dry",
          "Avoid direct sunlight"
        ]
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Skin Condition Analysis
        </Typography>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<Upload />}
                onClick={() => setShowCamera(false)}
              >
                Upload Image
              </Button>
              <Button
                variant="contained"
                startIcon={<PhotoCamera />}
                onClick={() => setShowCamera(true)}
              >
                Use Camera
              </Button>
            </Box>

            {showCamera ? (
              <CameraCapture onCapture={handleImageUpload} />
            ) : (
              <ImageUpload onUpload={handleImageUpload} />
            )}

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <CircularProgress />
              </Box>
            )}

            {results && !loading && (
              <ResultsDisplay results={results} />
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Home; 