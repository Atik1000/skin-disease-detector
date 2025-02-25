import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Brightness4, Brightness7, History } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const Navbar = ({ darkMode, setDarkMode }: NavbarProps) => {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Skin Disease Detector
        </Typography>
        <Button
          color="inherit"
          startIcon={<History />}
          onClick={() => navigate('/history')}
        >
          History
        </Button>
        <IconButton
          color="inherit"
          onClick={() => setDarkMode(!darkMode)}
          sx={{ ml: 1 }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 