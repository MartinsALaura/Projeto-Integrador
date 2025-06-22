import React from 'react';
import { Nav, Container } from './styles';
import Grid from '@mui/material/Grid';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Nav>
      <Grid container spacing={1}>
        <Grid size={3}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'flex-start',
          }}>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MenuRoundedIcon style={{ color: 'white', fontSize: '2rem' }} />
            </IconButton>
            <Box
              component="img"
              sx={{
                height: 94,
                ml: 6.25
              }}
              alt="Logo Livro"
              src="/images/livro-logo-branco.png"
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
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Grid>
        <Grid size={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center'}}>
            <Typography variant="h3" sx={{ color: (theme) => theme.colors.light }}>
              Encontre o seu livro
            </Typography>
            <TextField 
              id="search-bar"
              label="Pesquisar"
              variant="filled"
              sx={{
                backgroundColor: (theme) => theme.colors.light,
                borderRadius: '80px',
                '& .MuiInputLabel-root': {
                  color: (theme) => theme.colors.brown
                },
                '& .MuiFilledInput-root': {
                  backgroundColor: (theme) => theme.colors.light,
                  borderRadius: '80px',
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
          </Box>
        </Grid>
        <Grid size={3} sx={{ display: 'flex', alignItems: 'start', justifyContent: 'flex-end' }}>
          <Button variant="contained" sx={{ marginRight: '15px' }}>Criar Conta</Button>
          <Button color="secondary" variant="contained">Entrar</Button>
        </Grid>
      </Grid>
    </Nav>
  );
};

export default Navbar;