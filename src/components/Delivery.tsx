import React, { FunctionComponent, useEffect } from "react";
import { Typography, TextField } from '@mui/material';

interface DeliveryProps {
  address: string;
  instructions: string;
  setAddress: (value: string) => void;
  setInstructions: (value: string) => void;
  handleFormCompletedChange: (value: boolean) => void;
  city: string;
  setCity: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  zip: string;
  setZip: (value: string) => void;
}

const Delivery: FunctionComponent<DeliveryProps> = ({ address, instructions, setAddress, setInstructions, handleFormCompletedChange, city, setCity, region, setRegion, zip, setZip }) => {
  console.log(address);
  console.log(instructions);

  useEffect(() => {
    const isCompleted = address !== '' && instructions !== '' && city !== '' && region !== '' && zip !== '';
    handleFormCompletedChange(isCompleted);
  }, [address, instructions, handleFormCompletedChange, city, region, zip]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
      <div style={{
        height: '329.5px',
      }}>
        <Typography component="h1" variant="h5" align="center" style={{ marginTop: '-20px' }}>
          Shipping Information
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
          <div>
            <div>
              <TextField
                color="primary"
                variant="outlined"
                type="text"
                name="address"
                id="address"
                label="Street address *"
                placeholder="Enter Street address"
                size="medium"
                margin="normal"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                autoComplete="address"
                style={{ width: '50%', marginRight: 5 }}
              />
              <TextField
                color="primary"
                variant="outlined"
                type="text"
                name="city"
                id="city"
                label="City *"
                placeholder="Enter your city"
                size="medium"
                margin="normal"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="city"
                style={{ width: '40%', marginLeft: 5 }}
              />
            </div>
            <div>
              <TextField
                color="primary"
                variant="outlined"
                type="text"
                name="State/Province/Region"
                id="region"
                label="State/Province/Region *"
                placeholder="State/Province/Region"
                size="medium"
                margin="normal"
                fullWidth
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                autoComplete="region"
                style={{ width: '50%', marginRight: 5 }}
              />
              <TextField
                color="primary"
                variant="outlined"
                type="tel"
                name="zip"
                id="zip"
                label="ZIP code *"
                placeholder="Enter ZIP code"
                size="medium"
                margin="normal"
                fullWidth
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                autoComplete="zip"
                style={{ width: '40%', marginLeft: 5 }}
              />
            </div>
            <div>
              <TextField
                id="outlined-multiline-static"
                label="Special Delivery Instructions"
                placeholder="Enter Special Delivery Instructions"
                multiline
                rows={2}
                fullWidth
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                style={{ width: '92%', marginTop: '3.7%' }}
                inputProps={{ maxLength: 42 }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Delivery;