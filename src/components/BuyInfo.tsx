import React, { FunctionComponent, useEffect, useState } from "react";
import { Typography, TextField, FormControlLabel, Checkbox } from '@mui/material';

interface BuyInfoProps {
  updateDeliveryData: (name: string, value: string) => void;
  handleFormCompletedChange: (value: boolean) => void;
}

const BuyInfo: FunctionComponent<BuyInfoProps> = ({ updateDeliveryData, handleFormCompletedChange }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    const isCompleted = name !== '' && lastName !== '' && phone !== '' && email !== '' && password !== '' && acceptTerms;
    handleFormCompletedChange(isCompleted)
  }, [name, lastName, phone, email, password, acceptTerms, handleFormCompletedChange]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    updateDeliveryData('name', e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    updateDeliveryData('lastName', e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    updateDeliveryData('phone', e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    updateDeliveryData('email', e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    updateDeliveryData('password', e.target.value);
  };

  const handleAcceptTermsChange = () => {
    setAcceptTerms(!acceptTerms);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
      <div style={{
        height: '329.5px'
      }}>
        <Typography component="h1" variant="h5" align="center" style={{ marginTop: '-20px' }}>
          Register
        </Typography>

        <form noValidate onSubmit={handleSubmit}>
          <div>
            <div>
              <TextField
                color="primary"
                variant="outlined"
                type="text"
                name="name"
                id="name"
                label="First name *"
                placeholder="Enter first name"
                size="medium"
                margin="normal"
                fullWidth
                value={name}
                onChange={handleNameChange}
                autoFocus
                autoComplete="name"
                style={{ width: '45%', marginRight: 5 }}
              />
              <TextField
                color="primary"
                variant="outlined"
                type="text"
                name="lastName"
                id="lastName"
                label="Last Name *"
                placeholder="Enter last name"
                size="medium"
                margin="normal"
                fullWidth
                value={lastName}
                onChange={handleLastNameChange}
                autoComplete="apellidos"
                style={{ width: '45%', marginLeft: 5 }}
              />
            </div>
            <div>
              <TextField
                color="primary"
                variant="outlined"
                type="tel"
                name="phone"
                id="phone"
                label="Phone number *"
                placeholder="Enter Phone number"
                size="medium"
                margin="normal"
                fullWidth
                value={phone}
                onChange={handlePhoneChange}
                autoComplete="phone"
                style={{ width: '45%', marginRight: 5 }}
              />
              <TextField
                color="primary"
                variant="outlined"
                type="email"
                name="email"
                id="email"
                label="Email *"
                placeholder="Enter Email"
                size="medium"
                margin="normal"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                style={{ width: '45%', marginLeft: 5 }}
              />
            </div>
            <div>
              <TextField
                color="primary"
                variant="outlined"
                type="password"
                name="password"
                id="password"
                label="Password *"
                placeholder="Enter password"
                size="medium"
                margin="normal"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                style={{ width: '92%' }}
              />
            </div>
            <div>
              <FormControlLabel
                control={<Checkbox color="primary" checked={acceptTerms} onChange={handleAcceptTermsChange} />}
                label={
                  <Typography variant="body1">
                    Accept our <b>terms and conditions </b>
                  </Typography>
                }
                style={{ marginTop: '2%' }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyInfo;