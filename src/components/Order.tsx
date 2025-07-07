import { FunctionComponent } from "react";
import { Typography, Grid } from '@mui/material';

interface OrderProps {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  total: string;
  instructions: string;
  address: string;
  cartItems: Array<any>;
  city: string;
  region: string;
  zip: string;
}

const Order: FunctionComponent<OrderProps> = ({ name, phone, email, lastName, total, address, instructions, cartItems, city, region, zip }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'auto' }}>
      <Typography component="h1" variant="h5" align="center" style={{ marginBottom: '10px', marginTop: '10px', width: '100%' }}>
        Order
      </Typography>

      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ width: '98%' }}>
        <Grid item xs={12} sm={6} md={4}>
          <div style={{ border: '1px solid black', padding: '10px', textAlign: 'left', width: '100%', minHeight: '186px' }}>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Order Information</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>First Name:</strong></Typography>
                <Typography>{name}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>Last Name:</strong></Typography>
                <Typography>{lastName}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>Phone:</strong></Typography>
                <Typography>{phone}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>Email:</strong></Typography>
                <Typography>{email}</Typography>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <div style={{ border: '1px solid black', padding: '10px', textAlign: 'left', width: '100%', minHeight: '186px' }}>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Shipping Address</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>Address:</strong></Typography>
                <Typography>{address}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>City:</strong></Typography>
                <Typography>{city}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>Region:</strong></Typography>
                <Typography>{region}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>Zip:</strong></Typography>
                <Typography>{zip}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '110px' }}><strong>Instructions:</strong></Typography>
                <Typography>{instructions}</Typography>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <div style={{ border: '1px solid black', padding: '10px', textAlign: 'left', width: '100%', minHeight: '186px' }}>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Total</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '385px' }}><strong>Items Price:</strong></Typography>
                <Typography>{parseFloat(total).toFixed(2)}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '385px' }}><strong>Shipping:</strong></Typography>
                <Typography>{(parseFloat(total) * 0.1).toFixed(2)}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '385px' }}><strong>Taxes:</strong></Typography>
                <Typography>{(parseFloat(total) * 0.1).toFixed(2)}</Typography>
              </div>
              <div style={{ display: 'flex', width: '100%' }}>
                <Typography style={{ width: '385px' }}><strong>Total:</strong></Typography>
                <Typography>{(parseFloat(total) * 1.2).toFixed(2)}</Typography>
              </div>
            </div>
          </div>
        </Grid>

        <Grid item xs={12} style={{ width: '100%' }}>
          <div style={{ border: '1px solid black', padding: '10px', textAlign: 'left', width: '100%', minHeight: '160px' }}>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Purchased Items</Typography>
            <Typography variant="body2" style={{ fontWeight: 'bold' }}>Order number: {Math.floor(Math.random() * 90000) + 10000}</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid black' }}>
                    <th style={{ color: 'black', textAlign: 'left', padding: '8px' }}>Qty.</th>
                    <th style={{ color: 'black', textAlign: 'left', padding: '8px' }}>Title</th>
                    <th style={{ color: 'black', textAlign: 'left', padding: '8px' }}>Shipping Service</th>
                    <th style={{ color: 'black', textAlign: 'left', padding: '8px' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid black' }}>
                      <td style={{ padding: '8px' }}>{item.quantity}</td>
                      <td style={{ padding: '8px' }}>{item.title}</td>
                      <td style={{ padding: '8px' }}>UPS</td>
                      <td style={{ padding: '8px' }}>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Order;