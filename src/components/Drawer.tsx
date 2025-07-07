import React, { FunctionComponent } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppsIcon from '@mui/icons-material/Apps';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import DiamondIcon from '@mui/icons-material/Diamond';
import Woman2Icon from '@mui/icons-material/Woman2';
import ManIcon from '@mui/icons-material/Man';

interface DrawerProps {
  open: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleCategorySelect: (category: string) => void;
}

const Drawer: FunctionComponent<DrawerProps> = ({ open, onClose, onOpen, handleCategorySelect }) => {
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{
        width: '100%',
        '& .MuiDrawer-paper': {
          width: '100%'
        }
      }}
    >
      <div role="presentation">
        <List>
          <ListItem disablePadding>
            <ListItemButton sx={{ width: '100%' }} onClick={onClose}>
              <ListItemIcon>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </ListItemIcon>
              <ListItemText primary="Close" primaryTypographyProps={{ style: { fontWeight: 'bold' } }} />
            </ListItemButton>
          </ListItem>
          <Divider />
          {['All', 'electronics', 'jewelery', "men's clothing", "women's clothing"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleCategorySelect(text)}>
                <ListItemIcon>
                  {index % 5 === 0 ? <AppsIcon /> : index % 5 === 1 ? <LiveTvIcon /> : index % 5 === 2 ? <DiamondIcon /> : index % 5 === 3 ? <ManIcon /> : <Woman2Icon />}
                </ListItemIcon>
                <ListItemText primary={text.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    </SwipeableDrawer>
  );
};

export default Drawer;