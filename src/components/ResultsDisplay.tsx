import { Box, Typography, Paper, LinearProgress, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Info } from '@mui/icons-material';

interface ResultsDisplayProps {
  results: {
    disease: string;
    confidence: number;
    recommendations: string[];
  };
}

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const confidencePercentage = Math.round(results.confidence * 100);

  return (
    <Box sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Analysis Results
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Detected Condition:
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            {results.disease}
          </Typography>
          
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Confidence: {confidencePercentage}%
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={confidencePercentage}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Recommendations:
        </Typography>
        <List>
          {results.recommendations.map((recommendation, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {index === 0 ? <Info color="primary" /> : <CheckCircle color="success" />}
              </ListItemIcon>
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ResultsDisplay; 