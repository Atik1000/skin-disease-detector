import { useState, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { Upload } from '@mui/icons-material';

interface ImageUploadProps {
  onUpload: (imageData: string) => void;
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setPreview(imageData);
        onUpload(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Box
        sx={{
          border: '2px dashed grey',
          borderRadius: 2,
          p: 3,
          mb: 2,
          cursor: 'pointer',
        }}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        ) : (
          <Box>
            <Upload sx={{ fontSize: 60, color: 'text.secondary' }} />
            <Typography color="text.secondary">
              Click or drag an image here
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload; 