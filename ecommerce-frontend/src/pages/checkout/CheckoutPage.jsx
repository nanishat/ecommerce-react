import axios from 'axios';
import { useState, useEffect } from 'react';

import CheckoutHeader from './CheckoutHeader';
import OrderSummary from './OrderSummary';
import PaymentSummary from './PaymentSummary';

import './CheckoutPage.css';

function CheckoutPage({ cart }) {

  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummery] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);

      response = await axios.get('/api/payment-summary');
      setPaymentSummery(response.data);
    }

    fetchCheckoutData();
  }, []);

  return (
    <>
      <link rel="icon" type="image" href="/cart-favicon.png" />

      <title>Checkout</title>

      <CheckoutHeader />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />
          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  );
}

export default CheckoutPage;