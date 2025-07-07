import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetAllProductsQuery } from '../slices/productsApiSlice';

interface ProductCatalogProps {
  onSelectProduct: (product: any) => void;
  categoryFilter: string;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ onSelectProduct, categoryFilter }) => {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const { data: products, error, isLoading } = useGetAllProductsQuery(null);

  useEffect(() => {
    if (products) {
      if (categoryFilter === 'All') {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product: { category: string }) => product.category === categoryFilter);
        setFilteredProducts(filtered);
      }
    }
  }, [categoryFilter, products]);

  const handleProductClick = (product: any) => {
    onSelectProduct(product);
    navigate(`/product-detail/${product.id}`);
  };

  const logProductClick = (productId: string) => {
    console.log("Product clicked:", productId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    if ('status' in error) {
      return <p>Error: {error.status}</p>;
    }
    if ('data' in error) {
      return <p>Error: {String(error.data)}</p>;
    }
  }

  return (
    <Grid container spacing={2} className="grid-container">
      {filteredProducts.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <div className="product" style={{ cursor: 'pointer' }} onClick={() => { handleProductClick(product); logProductClick(product.id); }}>
            <div className="image-container">
              <img src={product.image} className="product-image" alt="Product" />
            </div>
            <div className="product-details">
              <h2>{product.title}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
              <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductCatalog;