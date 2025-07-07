import React, { FunctionComponent, useState, useEffect } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import { InputAdornment, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  open: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
  onOpen: (event: React.KeyboardEvent | React.MouseEvent) => void;
  handleCategorySelect: (category: string) => void;
  cartItems?: any[];
  setCartItems: React.Dispatch<React.SetStateAction<any[]>>;
}

const consolidateCartItems = (cartItems: any[]): any[] => {
  const consolidatedItemsMap = new Map<number, any>();
  cartItems.forEach((item) => {
    if (consolidatedItemsMap.has(item.id)) {
      const existingItem = consolidatedItemsMap.get(item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      }
    } else {
      consolidatedItemsMap.set(item.id, { ...item });
    }
  });
  const consolidatedItemsArray = Array.from(consolidatedItemsMap.values());
  return consolidatedItemsArray;
};

const Cart: FunctionComponent<CartProps> = ({ open, onClose, onOpen, cartItems, setCartItems }) => {
  const [consolidatedCartItems, setConsolidatedCartItems] = useState<any[]>([]);
  const [isCartEmpty, setIsCartEmpty] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClearCart = () => {
      setConsolidatedCartItems([]);
      if (cartItems) {
        setCartItems([]);
        localStorage.removeItem('cartItems');
      }
    };
    const deleteCart = localStorage.getItem('deleteCart');
    if (deleteCart === 'true') {
      handleClearCart();
      localStorage.setItem('deleteCart', 'false');
    }
  }, [localStorage.getItem('deleteCart')]);

  useEffect(() => {
    if (cartItems) {
      const newConsolidatedCartItems = consolidateCartItems(cartItems);
      setConsolidatedCartItems(newConsolidatedCartItems);
    }
  }, [cartItems]);

  useEffect(() => {
    setIsCartEmpty(consolidatedCartItems.length === 0);
  }, [consolidatedCartItems]);

  const handleBuy = () => {
    console.log("Buy button clicked!");
    onClose({} as React.MouseEvent);
    navigate('/stepper');
    localStorage.setItem('inputButtonsDisabled', JSON.stringify(true));
  };

  const handleIncrement = (index: number) => {
    const updatedItems = [...consolidatedCartItems];
    updatedItems[index].quantity += 1;
    if (cartItems) {
      const updatedCartItems = [...cartItems];
      const productToUpdateIndex = updatedCartItems.findIndex(item => item.id === updatedItems[index].id);
      if (productToUpdateIndex !== -1) {
        updatedCartItems[productToUpdateIndex].quantity += 1;
      }
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
    setConsolidatedCartItems(updatedItems);
  };

  const handleDecrement = (index: number) => {
    const updatedItems = [...consolidatedCartItems];
    if (updatedItems[index].quantity > 1) {
      updatedItems[index].quantity -= 1;
      if (cartItems) {
        const updatedCartItems = [...cartItems];
        const productToUpdateIndex = updatedCartItems.findIndex(item => item.id === updatedItems[index].id);
        if (productToUpdateIndex !== -1) {
          updatedCartItems[productToUpdateIndex].quantity -= 1;
          setCartItems(updatedCartItems);
          localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        }
      }
    } else {
      if (cartItems) {
        const productId = updatedItems[index].id;
        const updatedCartItems = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      }
      updatedItems.splice(index, 1);
    }
    setConsolidatedCartItems(updatedItems);
  };

  const handleDeleteItem = (index: number) => {
    const updatedConsolidatedItems = [...consolidatedCartItems];
    const deletedItem = updatedConsolidatedItems.splice(index, 1)[0];
    if (cartItems) {
      const updatedCartItems = cartItems.filter(item => item.id !== deletedItem.id);
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    }
    setConsolidatedCartItems(updatedConsolidatedItems);
  };

  const getTotalAmount = (): number => {
    return consolidatedCartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
      sx={{
        width: '100%',
        '& .MuiDrawer-paper': {
          width: '35%',
          '@media (max-width: 960px)': {
            width: '55%'
          },
          '@media (max-width: 600px)': {
            width: '80%'
          }
        }
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <List>
            {consolidatedCartItems.map((item, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <Divider />}
                <ListItem style={{ display: 'flex', alignItems: 'center' }}>
                  <div >
                    <TextField
                      id={`quantity-${index}`}
                      type="number"
                      value={item.quantity}
                      InputProps={{
                        inputProps: { min: 1 },
                        style: { width: '26px', height: '65px' },
                        endAdornment: (
                          <InputAdornment position="end" style={{ marginLeft: '-10px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <IconButton onClick={() => handleIncrement(index)} disabled={localStorage.getItem('inputButtonsDisabled') === 'true'} style={{ padding: '0', marginRight: '22px', marginBottom: '0px', marginTop: '2px', border: '1px solid black', background: '#E4E4E4' }}>
                                <KeyboardArrowUpIcon style={{ fontSize: '70%' }} />
                              </IconButton>
                              <div style={{ width: '35px', marginLeft: '-23px', textAlign: 'center', alignItems: 'center' }}>{item.quantity}</div>
                              <IconButton onClick={() => handleDecrement(index)} disabled={localStorage.getItem('inputButtonsDisabled') === 'true'} style={{ padding: '0', marginRight: '22px', marginTop: '0px', marginBottom: '2px', border: '1px solid black', background: '#E4E4E4' }}>
                                <KeyboardArrowDownIcon style={{ fontSize: '70%' }} />
                              </IconButton>
                            </div>
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      style={{ margin: '10px 0', width: '50%', minWidth: '40px' }}
                    />
                  </div>
                  <ListItemIcon>
                    <img src={item.image} alt="Product" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<span style={{ fontWeight: 'bold' }}>{item.title}</span>}
                    primaryTypographyProps={{ style: { fontSize: '13px' } }}
                    secondary={`Price: $${item.price}`}
                    style={{ marginRight: '20px' }}
                  />
                  <IconButton onClick={() => handleDeleteItem(index)} disabled={localStorage.getItem('inputButtonsDisabled') === 'true'} >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </div>

        <Divider style={{ width: '100%', backgroundColor: 'black' }} />
        <div className="cart-summary" style={{ padding: '16px' }}>
          <div className="cart-summary-row">
            <div className="label">Subtotal</div>
            <div className="value">${getTotalAmount().toFixed(2)}</div>
          </div>
          <hr style={{ margin: '8px 0' }} />
          <div className="cart-summary-row cart-total">
            <div className="label">Total</div>
            <div className="value">${getTotalAmount().toFixed(2)}</div>
          </div>

          <div style={{ marginTop: '16px' }}>
            <Button variant="contained" onClick={onClose} color="primary" fullWidth>
              Close
            </Button>
            <div style={{ marginTop: '8px' }}>
              <Button variant="contained" onClick={handleBuy} color="secondary" fullWidth disabled={isCartEmpty}>
                Buy
              </Button>
            </div>
          </div>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default Cart;