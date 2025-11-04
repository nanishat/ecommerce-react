import axios from 'axios';
import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import ProductsGrid from './ProductsGrid';

import './HomePage.css';


function HomePage({ cart, loadCart }) {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsData = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    }

    fetchProductsData();
  }, []);

  return (
    <>
      <link rel="icon" type="image" href="/home-favicon.png" />

      <title>Ecommerce Project</title>

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}

export default HomePage;