import { SetStateAction, useEffect, useState } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BuyInfo from './BuyInfo';
import Delivery from './Delivery';
import Payment from './Payment';
import Order from './Order';

function getSteps() {
  return ['Register', 'Shipping', 'Payment', 'Order'];
}

function getStepContent(stepIndex: number, params: { name: any; phone: any; email: any; lastName: any; updateDeliveryData: any; total: any; address: any; instructions: any; setAddress: any; setInstructions: any; cartItems: any; handleFormCompletedChange: any; city: any; setCity: any; region: any; setRegion: any; zip: any; setZip: any; }) {
  switch (stepIndex) {
    case 0:
      return <BuyInfo updateDeliveryData={params.updateDeliveryData} handleFormCompletedChange={params.handleFormCompletedChange} />;
    case 1:
      return <Delivery
        address={params.address}
        instructions={params.instructions}
        setAddress={params.setAddress}
        setInstructions={params.setInstructions}
        handleFormCompletedChange={params.handleFormCompletedChange}
        city={params.city}
        setCity={params.setCity}
        region={params.region}
        setRegion={params.setRegion}
        zip={params.zip}
        setZip={params.setZip}
      />;
    case 2:
      return <Payment name={params.name} lastName={params.lastName} total={params.total} handleFormCompletedChange={params.handleFormCompletedChange} />;
    case 3:
      return <Order
        name={params.name}
        lastName={params.lastName}
        phone={params.phone}
        email={params.email}
        total={params.total}
        instructions={params.instructions}
        address={params.address}
        cartItems={params.cartItems}
        city={params.city}
        region={params.region}
        zip={params.zip}
      />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function HorizontalLabelPositionBelowStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [zip, setZip] = useState('');
  const navigate = useNavigate();

  localStorage.setItem('inputButtonsDisabled', JSON.stringify(true))

  useEffect(() => {
    localStorage.setItem('inputButtonsDisabled', JSON.stringify(true));
  }, [localStorage.getItem('inputButtonsDisabled')]);

  useEffect(() => {
    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString !== null) {
      const cartItems = JSON.parse(cartItemsString);
      let total_ = 0;
      cartItems.forEach((item: { quantity: number; price: number; }) => {
        total_ += item.quantity * item.price;
      });
      setTotal(total_);
      setCartItems(cartItems);
    } else {
      console.log("No hay elementos en el carrito.");
    }
  }, []);

  useEffect(() => {
    const stepperRoot = document.querySelector('.MuiStepper-root');
    if (stepperRoot) {
      const paperRoot = stepperRoot.querySelector('.MuiPaper-root') as HTMLDivElement;
      if (paperRoot) {
        paperRoot.style.color = 'inherit';
      }
    }
  }, []);

  useEffect(() => {
    if (activeStep === steps.length) {
      localStorage.setItem('inputButtonsDisabled', JSON.stringify(false));
      localStorage.setItem('deleteCart', JSON.stringify(true));
      const timer = setTimeout(() => {
        navigate('/product-catalog');
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeStep]);

  useEffect(() => {
    if (activeStep === steps.length) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeStep, steps.length]);

  const handleFormCompletedChange = (value: boolean | ((prevState: boolean) => boolean)) => {
    setIsFormCompleted(value);
  };

  const updateDeliveryData = (name: any, value: SetStateAction<string>) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      default:
        break;
    }
  };

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div style={{
            height: '329.5px',
          }}>
            <Typography><b>Purchase successful !!</b></Typography>
          </div>
        ) : (
          <div>
            <Typography>
              {getStepContent(activeStep, { name, phone, email, lastName, updateDeliveryData, total, address, instructions, setAddress, setInstructions, cartItems, handleFormCompletedChange, city, setCity, region, setRegion, zip, setZip })}
            </Typography>
            <Card style={{ marginTop: '10px', marginBottom: '-8px', backgroundColor: '#f0f0f0' }}>
              <CardContent>
                <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="primary" style={{ marginLeft: '10px', outline: 'none' }}>
                  Back Step
                </Button>
                <Button style={{ marginLeft: '10px', outline: 'none' }} variant="contained" color="primary" onClick={handleNext} disabled={!isFormCompleted}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next Step'}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}