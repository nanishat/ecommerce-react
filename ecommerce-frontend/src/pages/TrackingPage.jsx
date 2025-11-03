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
      const respone = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrder(respone.data);
    }
    fetchTrackingPage();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  })

  const totalDelivaryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  let delivaryPercent = (timePassedMs / totalDelivaryTimeMs) * 100;
  if (delivaryPercent > 100) {
    delivaryPercent = 100;
  }

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
            Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className="progress-label">
              Preparing
            </div>
            <div className="progress-label current-status">
              Shipped
            </div>
            <div className="progress-label">
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${delivaryPercent}` }}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackingPage;