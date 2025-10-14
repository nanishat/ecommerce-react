import { Link } from 'react-router'
import assets from '../../assets/assets'
import './CheckoutHeader.css'

function CheckoutHeader() {
  return (
    <>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src={assets.logo} />
              <img className="mobile-logo" src={assets.mobile_logo} />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (<Link className="return-to-home-link"
              to="/">3 items</Link>)
          </div>

          <div className="checkout-header-right-section">
            <img src={assets.checkout_lock_icon} />
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutHeader;