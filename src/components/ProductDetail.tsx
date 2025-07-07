import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Typography, Button, Grid, TextField, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetProductByIdQuery } from '../slices/productsApiSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface ProductDetailProps {
  product: any;
  onBack: () => void;
  onAddToCart: (product: any) => void;
}

const ProductDetail: FunctionComponent<ProductDetailProps> = ({ onAddToCart }) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [mouseInside, setMouseInside] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const zoomRef = useRef<HTMLDivElement>(null);
  
  const urlSegments = window.location.href.split('/');
  const lastSegment = urlSegments[urlSegments.length - 1];
  console.log("Último segmento de la URL:", lastSegment);
  const { data: productDetails, error, isLoading } = useGetProductByIdQuery(lastSegment);

  useEffect(() => {
    console.log(isLoading);
    window.scrollTo(0, 0);
  }, [productDetails]);

  console.log("productDetails");
  console.log(productDetails);
  console.log(error);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (mouseInside) {
      const img = zoomRef.current?.querySelector('img');
      if (!img) return;
      const rect = zoomRef.current?.getBoundingClientRect();
      const offsetX = e.clientX - rect!.left;
      const offsetY = e.clientY - rect!.top;
      const percentX = offsetX / rect!.width;
      const percentY = offsetY / rect!.height;
      img.style.transformOrigin = `${percentX * 100}% ${percentY * 100}%`;
      if (!isZoomed) {
        img.style.transition = 'transform 0.5s ease';
        img.style.transform = 'scale(2.5)';
        setIsZoomed(true);
      }
    }
  };

  const handleMouseEnter = () => {
    setMouseInside(true);
  };

  const handleMouseLeave = () => {
    setMouseInside(false);
    if (isZoomed) {
      const img = zoomRef.current?.querySelector('img');
      if (img) {
        img.style.transition = 'transform 0.5s ease';
        img.style.transform = 'scale(1)';
        setIsZoomed(false);
      }
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${productDetails.title} to cart`);
    const updatedProduct = { ...productDetails, quantity: quantity };
    onAddToCart(updatedProduct);
  };

  if (isLoading) {
    return (
      <div style={{ height: '422px' }}>
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="contenedor" style={{ display: 'flex' }}>
        <div className="mitad-izquierda" style={{ flex: '1' }}>
          <Typography variant="h6" align="center" style={{ lineHeight: '1.5em' }}>
            No se ha seleccionado ningún producto.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <Grid container spacing={2} style={{ marginTop: 0 }}>
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <div style={{ position: 'relative', minHeight: '545px' }}>
          <Link to="/product-catalog" style={{ textDecoration: 'none', position: 'absolute', top: '10px', left: '20px' }}>
            <Button variant="contained" >
              <ArrowBackIosIcon style={{ marginLeft: '7px' }} />
            </Button>
          </Link>

          <div
            ref={zoomRef}
            className="zoom-container"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ marginTop: '50px' }}
          >
            <img
              src={productDetails.image}
              alt="Product"
              className="zoom-img"
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                padding: '15px',
                display: 'block',
                margin: 'auto',
              }}
            />
          </div>
        </div>
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} style={{ backgroundColor: '#e0e0e0' }}>
        <div style={{ backgroundColor: '#e0e0e0', padding: '20px' }}>
          <div>
            <hr />
            <Typography variant="h6" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>{productDetails.title}</span>
            </Typography>
            <hr />
            <Typography variant="h6" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>Price: ${productDetails.price}</span>
            </Typography>
            <hr />
            <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>Category:</span> {productDetails.category}
            </Typography>
            <hr />
            <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>Description:</span> {productDetails.description}
            </Typography>
            <hr />
            <Typography variant="body1" align="justify" style={{ lineHeight: '1.5em' }}>
              <span style={{ fontWeight: 'bold' }}>Rating:</span> {productDetails.rating.rate} ({productDetails.rating.count} reviews)
            </Typography>
            <hr />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                id="quantity"
                type="number"
                value={quantity}
                InputProps={{
                  inputProps: { min: 1 },
                  style: { display: 'flex', alignItems: 'center', width: '123px' },
                  endAdornment: (
                    <InputAdornment position="end" style={{ marginLeft: '-10px' }}>
                      <IconButton onClick={handleDecrement}>
                        <RemoveIcon />
                      </IconButton>
                      <div style={{ width: '35px', textAlign: 'center' }}>{quantity}</div>
                      <IconButton onClick={handleIncrement}>
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                style={{ margin: '10px 0', width: '150px' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                style={{ margin: '10px 0', height: '56px', marginLeft: '-27px', width: 135 }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductDetail;