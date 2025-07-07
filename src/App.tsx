import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';
import ProductCatalog from './components/ProductCatalog';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import BuyInfo from './components/BuyInfo';
import HorizontalLinearStepper from './components/HorizontalLinearStepper';
import Delivery from './components/Delivery';
import Payment from './components/Payment';
import Order from './components/Order';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const cartItemsString = localStorage.getItem('cartItems');
  const location = useLocation();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const handleCategorySelectCart = (category: string) => {
    setCategoryFilter(category);
    setCartOpen(false);
  };

  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category);
    setDrawerOpen(false);
  };

  const handleProductSelect = (product: any) => {
    setSelectedProduct(product);
  };

  const handleBackClick = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product: any) => {
    setCartItems(prevCartItems => [...prevCartItems, product]);
  };

  const setInputButtonsDisabled = (value: boolean) => {
    localStorage.setItem('inputButtonsDisabled', JSON.stringify(value));
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems, setCartItems]);

  useEffect(() => {
    const fetchData = async () => {
      const cartItemsString = localStorage.getItem('cartItems');
      const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
      const total = cartItems.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
      setTotalItems(total);
    };
    fetchData();
  }, [cartItemsString, totalItems, cartItems, setCartItems]);

  useEffect(() => {
    setInputButtonsDisabled(location.pathname === '/stepper/');
  }, [location]);

  return (
    <>
      <Header onMenuClick={toggleDrawer} onCartClick={toggleCart} totalItems={totalItems} />
      <Drawer open={drawerOpen} onClose={toggleDrawer} onOpen={() => { }} handleCategorySelect={handleCategorySelect} />
      <Cart open={cartOpen} onClose={toggleCart} onOpen={() => { }}
        handleCategorySelect={handleCategorySelectCart} cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/product-catalog" />} />
        <Route path="/product-catalog" element={<ProductCatalog onSelectProduct={handleProductSelect} categoryFilter={categoryFilter} />} />
        <Route path="/product-detail/:productId" element={<ProductDetail product={selectedProduct} onBack={handleBackClick} onAddToCart={addToCart} />} />

        <Route
          path="/buy-info/"
          element={<BuyInfo
            updateDeliveryData={(): void => {
              throw new Error('Function not implemented.');
            }}
            handleFormCompletedChange={(): void => {
              throw new Error('Function not implemented.');
            }}
          />}
        />
        <Route path="/stepper/" element={<HorizontalLinearStepper />} />

        <Route
          path="/delivery/"
          element={<Delivery
            address={''}
            instructions={''}
            setAddress={() => { }}
            setInstructions={() => { }}
            handleFormCompletedChange={(): void => {
              throw new Error('Function not implemented.');
            }}
            city={''}
            setCity={() => { }}
            region={''}
            setRegion={() => { }}
            zip={''}
            setZip={() => { }}
          />}
        />
        <Route path="/payment/" element={<Payment name={''} lastName={''} total={''}
          handleFormCompletedChange={(): void => {
            throw new Error('Function not implemented.');
          }} />} />

        <Route path="/order/" element={<Order name={''} phone={''} email={''} lastName={''} total={''} instructions={''} address={''} cartItems={cartItems} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;