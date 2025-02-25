import { useState, useRef, useCallback } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Webcam from 'react-webcam';
import { Camera, Cameraswitch } from '@mui/icons-material';

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
}

const CameraCapture = ({ onCapture }: CameraCaptureProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [error, setError] = useState<string>('');

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const videoConstraints = {
    width: 720,
    height: 720,
    facingMode: facingMode,
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      {error ? (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      ) : (
        <Box sx={{ position: 'relative' }}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            onUserMediaError={(err) => setError('Camera access denied or not available')}
            style={{ width: '100%', maxWidth: '500px', borderRadius: '8px' }}
          />
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Camera />}
              onClick={capture}
            >
              Capture Photo
            </Button>
            <Button
              variant="outlined"
              startIcon={<Cameraswitch />}
              onClick={toggleCamera}
            >
              Switch Camera
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CameraCapture; 