import axios from 'axios';
import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import './TrackingPage.css';
import dayjs from 'dayjs';

function TrackingPage({ cart }) {

  const { orderId, productId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchTrackingPage = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }
    fetchTrackingPage();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  })

  // delivary progress calculation
  const totalDelivaryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let delivaryPercent = (timePassedMs / totalDelivaryTimeMs) * 100;
  if (delivaryPercent > 100) { delivaryPercent = 100; }
  const isPreparing = delivaryPercent < 33;
  const isShipped = delivaryPercent >= 33 && delivaryPercent < 100;
  const isDelivered = delivaryPercent === 100;

  return (
    <>
      <link rel="icon" type="image" href="/tracking-favicon.png" />

      <title>Tracking</title>

      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {delivaryPercent >= 100 ? 'Delivered on' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${delivaryPercent}%` }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;