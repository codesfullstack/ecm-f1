import React, { FunctionComponent, useEffect, useState } from "react";
import { Typography, Button, Accordion, AccordionSummary, AccordionDetails, TextField, Radio, RadioGroup, FormControlLabel, Grid, Modal, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputMask from 'react-input-mask';

interface PaymentProps {
  name: string;
  lastName: string;
  total: string;
  handleFormCompletedChange: (value: boolean) => void;
}

const Payment: FunctionComponent<PaymentProps> = ({ name, lastName, total, handleFormCompletedChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('method1');
  const [expanded1, setExpanded1] = useState(false);
  const [expanded2] = useState(false);
  const [expanded3] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [confirmPay, setConfirmPay] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyModalOpen, setCurrencyModalOpen] = useState(false);

  useEffect(() => {
    const isCompleted = cardNumber !== '' && expiration !== '' && securityCode !== '';
    setIsCompleted(isCompleted);
    console.log(confirmPay);
  }, [cardNumber, expiration, securityCode]);

  useEffect(() => {
    handleFormCompletedChange(confirmPay);
  }, [confirmPay]);

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedMethod(method);
    setExpanded1(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setExpanded1(false);
  };

  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');
    value = value.slice(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    event.target.value = value;
  };

  const handleSecurityCodeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let { value } = event.target;
    value = value.replace(/\D/g, '');
    value = value.slice(0, 4);
    event.target.value = value;
  };

  const handleCurrencyModalClose = () => {
    setCurrencyModalOpen(false);
    console.log(confirmPay);
  };

  const handleConfirmPayment = () => {
    setConfirmPay(true);
    console.log(confirmPay);
    handleCurrencyModalClose();
  };

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCurrency(event.target.value);
    setCurrencyModalOpen(false);
  };

  const handleOpenCurrencyModal = () => {
    setCurrencyModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' }}>
      <div style={{
        maxWidth: '397px',
        width: '92%',
        height: 'auto',
        minHeight: '329.5px',
      }}>
        <Typography component="h1" variant="h5" align="center" style={{ marginTop: '-20px', marginBottom: '16px' }}>
          Payment
        </Typography>

        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12}>
            <RadioGroup value={selectedMethod} onChange={(e) => handlePaymentMethodSelect(e.target.value)}>
              <Accordion expanded={expanded1}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  onClick={() => setExpanded1(!expanded1)}
                >
                  <FormControlLabel
                    value="method1"
                    control={<Radio />}
                    label={
                      <div style={{ display: 'flex', alignItems: 'center', width: '160px' }}>
                        <img src="cards7.jpg" alt="Method 1" style={{ width: '110px', height: '20px', marginRight: '10px', backgroundColor: '#e0e0e0' }} />
                      </div>
                    }
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <form onSubmit={handlePaymentSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={7} style={{ marginTop: '-25px' }}>
                        <TextField
                          label="Card Number"
                          fullWidth
                          margin="normal"
                          value={cardNumber}
                          onChange={(e) => {
                            const formattedValue = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
                            handleCardNumberChange(e);
                            setCardNumber(formattedValue);
                          }}
                          inputProps={{
                            maxLength: 19,
                          }}
                          placeholder="1111 2222 3333 4444"
                          type="tel"
                        />
                      </Grid>
                      <Grid item xs={5} style={{ marginTop: '-25px' }}>
                        <TextField
                          label="Expiration Date"
                          fullWidth
                          margin="normal"
                          InputProps={{
                            inputComponent: InputMask,
                            inputProps: {
                              mask: '99/99',
                              placeholder: 'MM/YY'
                            }
                          }}
                          value={expiration}
                          onChange={(e) => setExpiration(e.target.value)}
                          type="tel"
                        />
                      </Grid>
                      <Grid item xs={5} style={{ marginTop: '-17px' }}>
                        <TextField
                          label="Security Code"
                          fullWidth
                          margin="normal"
                          value={securityCode}
                          onChange={(e) => {
                            handleSecurityCodeChange(e);
                            setSecurityCode(e.target.value);
                          }}
                          inputProps={{
                            maxLength: 4,
                          }}
                          placeholder="1234"
                          type="tel"
                        />
                      </Grid>
                      <Grid item xs={3.5} style={{ marginTop: '-17px' }}>
                        <TextField label="First Name" fullWidth margin="normal" defaultValue={name} disabled />
                      </Grid>
                      <Grid item xs={3.5} style={{ marginTop: '-17px' }}>
                        <TextField label="Last Name" fullWidth margin="normal" defaultValue={lastName} disabled />
                      </Grid>
                      <Grid item xs={12} style={{ marginTop: '0px' }}>
                        <Button variant="contained" color="primary" type="submit" onClick={handleOpenCurrencyModal} disabled={!isCompleted}>Payment</Button>
                      </Grid>
                    </Grid>
                  </form>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded2} disabled>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <FormControlLabel
                    value="method2"
                    control={<Radio />}
                    disabled
                    label={
                      <div style={{ display: 'flex', alignItems: 'center', width: '160px' }}>
                        <img src="pp.png" alt="Method 2" style={{ width: '70px', height: '45px', marginRight: '10px', backgroundColor: '#e0e0e0', filter: 'grayscale(100%)' }} />
                      </div>
                    }
                  />
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
              </Accordion>

              <Accordion expanded={expanded3} disabled>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <FormControlLabel
                    value="method3"
                    control={<Radio />}
                    disabled
                    label={
                      <div style={{ display: 'flex', alignItems: 'center', width: '160px' }}>
                        <img src="ppc.png" alt="Method 3" style={{ width: '70px', height: '45px', marginRight: '10px', backgroundColor: '#e0e0e0', filter: 'grayscale(100%)' }} />
                      </div>
                    }
                  />
                </AccordionSummary>
                <AccordionDetails>
                </AccordionDetails>
              </Accordion>
            </RadioGroup>
          </Grid>
        </Grid>

        <Modal
          open={currencyModalOpen}
          onClose={handleCurrencyModalClose}
          aria-labelledby="currency-modal-title"
          aria-describedby="currency-modal-description"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Box sx={{ bgcolor: 'background.paper', boxShadow: 24, p: 4, maxWidth: 365, width: '92%' }}>
            <Typography variant="h6" component="h2" align="center" gutterBottom>
              Select currency for this purchase
            </Typography>
            <RadioGroup aria-label="currency" name="currency" value={selectedCurrency} onChange={handleCurrencyChange}>
              <FormControlLabel value="USD" control={<Radio />} label={`USD | $${(parseFloat(total) * 1.2).toFixed(2)}`} />
              <FormControlLabel value="EUR" control={<Radio />} label="EUR |" disabled />
              <Typography variant="body2" color="textSecondary" style={{ marginLeft: '0px' }}>
                *Total value includes shipping and taxes.
              </Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginLeft: '0px' }}>
                *The issuer may charge associated costs.
              </Typography>
            </RadioGroup>
            <Button variant="contained" onClick={handleConfirmPayment} fullWidth style={{ marginTop: 15 }}>
              Comfirm Payment
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Payment;