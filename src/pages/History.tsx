import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { Delete, AccessTime } from '@mui/icons-material';

interface HistoryEntry {
  id: string;
  date: Date;
  disease: string;
  confidence: number;
  imageUrl: string;
}

const History = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockHistory: HistoryEntry[] = [
      {
        id: '1',
        date: new Date(),
        disease: 'Eczema',
        confidence: 0.89,
        imageUrl: 'https://placeholder.com/300',
      },
      {
        id: '2',
        date: new Date(Date.now() - 86400000),
        disease: 'Acne',
        confidence: 0.95,
        imageUrl: 'https://placeholder.com/300',
      },
    ];
    setHistory(mockHistory);
  }, []);

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(entry => entry.id !== id));
    // TODO: Implement API call to delete entry
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Scan History
        </Typography>

        <Grid container spacing={3}>
          {history.map((entry) => (
            <Grid item xs={12} sm={6} key={entry.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" component="div">
                      {entry.disease}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(entry.id)}
                      aria-label="delete"
                    >
                      <Delete />
                    </IconButton>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={<AccessTime />}
                      label={formatDate(entry.date)}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      Confidence: {Math.round(entry.confidence * 100)}%
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={entry.confidence * 100}
                      sx={{ mt: 1 }}
                    />
                  </Box>

                  {entry.imageUrl && (
                    <Box
                      component="img"
                      src={entry.imageUrl}
                      alt={entry.disease}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}

          {history.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body1" color="text.secondary" align="center">
                No scan history available
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default History; 