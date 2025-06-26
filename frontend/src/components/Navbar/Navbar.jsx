import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, MainContent } from './styles';
import Grid from '@mui/material/Grid';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useMediaQueries } from '../../styles/mediaQuery';

const Navbar = () => {
  const { isTablet } = useMediaQueries();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  };

  return (
    <Nav isTablet={isTablet} id="navbar">
      <Grid 
        container 
        spacing={1} 
        direction={isTablet ? 'column' : 'row'}
        alignItems={isTablet ? 'center' : 'flex-start'}
        id="navbar-grid"
      >
        <Grid size={isTablet ? 12 : 3} id="menu-logo">
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between',
            position: 'relative',
            paddingRight: isTablet ? '20px' : 0
          }}>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              sx={{ position: isTablet ? 'absolute' : 'static', left: isTablet ? '20px' : 'auto' }}
            >
              <MenuRoundedIcon style={{ color: 'white', fontSize: '2rem' }} />
            </IconButton>
            <Box
              component="img"
              sx={{
                height: 94,
                ml: isTablet ? 'auto' : 2,
                mr: isTablet ? 'auto' : 0,
                cursor: 'pointer'
              }}
              alt="Logo Livro"
              src="/images/livro-logo-branco.png"
              onClick={() => navigate('/')}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              slotProps={{
                list: {
                  'aria-labelledby': 'basic-button',
                },
              }}
            >
              <MenuItem onClick={() => handleNavigate('/login')}>Entrar</MenuItem>
              <MenuItem onClick={() => handleNavigate('/signup')}>Criar Conta</MenuItem>
            </Menu>
          </Box>
        </Grid>
        <Grid size={6}>
          <MainContent>
            <Typography 
              variant={isTablet ? "h4" : "h3"} 
              sx={{ 
                color: (theme) => theme.colors.light,
                textAlign: 'center'
              }}
            >
              Encontre o seu livro
            </Typography>
            <TextField 
              id="search-bar"
              label="Pesquisar"
              variant="filled"
              fullWidth
              sx={{
                backgroundColor: (theme) => theme.colors.light,
                borderRadius: '80px',
                maxWidth: isTablet ? '90%' : 'none',
                height: '35px',
                '& .MuiInputLabel-root': {
                  color: (theme) => theme.colors.brown,
                  transform: 'translate(14px, 8px) scale(1)',
                  '&.Mui-focused': {
                    transform: 'translate(14px, -10px) scale(0.75)'
                  },
                  '&.MuiInputLabel-shrink': {
                    transform: 'translate(14px, -10px) scale(0.75)'
                  }
                },
                '& .MuiFilledInput-root': {
                  backgroundColor: (theme) => theme.colors.light,
                  borderRadius: '80px',
                  height: '35px',
                  '&:hover': {
                    backgroundColor: (theme) => theme.colors.light,
                  },
                  '&.Mui-focused': {
                    backgroundColor: (theme) => theme.colors.light,
                  },
                  '&::before': {
                    display: 'none'
                  },
                  '&::after': {
                    display: 'none'
                  }
                }
              }}
            />
          </MainContent>
        </Grid>
        {!isTablet && (
          <Grid size={3} sx={{ display: 'flex', alignItems: 'start', justifyContent: 'flex-end' }}>
            <Button 
              variant="contained" 
              sx={{ marginRight: '15px' }}
              onClick={() => navigate('/signup')}
            >
              Criar Conta
            </Button>
            <Button 
              color="secondary" 
              variant="contained"
              onClick={() => navigate('/login')}
            >
              Entrar
            </Button>
          </Grid>
        )}
      </Grid>
    </Nav>
  );
};

export default Navbar;