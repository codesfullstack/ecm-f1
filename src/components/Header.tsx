import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';

interface HeaderProps {
  onMenuClick: () => void;
  onCartClick: () => void;
  totalItems: number;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onCartClick, totalItems }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogin = (username: any, password: any) => {
    console.log('Login credentials:', { username, password });
    handleCloseModal();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen} >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={onCartClick}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={7} color="error">
            <ShoppingCartCheckoutIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="header-app-bar">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/product-catalog"
            sx={{
              display: 'flex',
              alignItems: 'center',
              Fmr: 2,
              color: '#ffffff',
              width: {
                xs: 60,
                sm: 60,
                md: 60,
                lg: 60,
                xl: 60
              }
            }}
            style={{ color: '#ffffff' }}
          >
            ECM
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            style={{ color: '#ffffff' }}
            aria-label="open drawer"
            sx={{
              mr: 2,
              '&:focus': {
                outline: 'none',
              },
            }}
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <div
              onClick={handleOpenModal}
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                backgroundColor: 'transparent',
                border: 'none',
                color: 'white',
                marginRight: '30px'
              }}
              tabIndex={0}
            >
              <AccountCircle style={{ color: 'white', fontSize: '2.5rem' }} />
              <span style={{ marginLeft: '0.5rem', display: 'block', textAlign: 'left' }}>
                Hello!<br />
                Log in
              </span>
            </div>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={onCartClick}
              sx={{
                '&:focus': {
                  outline: 'none',
                },
              }}
              style={{ width: 40, height: 40, marginTop: 3 }}
            >
              <Badge badgeContent={totalItems} color="error" style={{ width: 40, height: 40 }}>
                <ShoppingCartCheckoutIcon style={{ color: 'white', fontSize: '2.5rem' }} />
              </Badge>
            </IconButton>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, marginRight: -1 }}>
            <div style={{ display: 'flex', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  flex: '1',
                  height: '96%',
                  cursor: 'pointer',
                  marginRight: '15px'
                }}
                onClick={handleOpenModal}
              >
                <AccountCircle style={{ color: 'white', fontSize: '1.55rem' }} />
              </div>

              <div style={{ flex: '1', marginRight: '5px' }} onClick={onCartClick}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  <Badge badgeContent={totalItems} color="error">
                    <ShoppingCartCheckoutIcon />
                  </Badge>
                </div>
              </div>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <LoginModal open={modalOpen} onClose={handleCloseModal} onLogin={handleLogin} />
    </Box>
  );
}

export default Header;