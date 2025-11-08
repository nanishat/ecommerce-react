import { useState } from 'react';
import { NavLink } from 'react-router';
import assets from '../assets/assets';
import '../components/Header.css';

function Header({ cart }) {

  const [search, setSearch] = useState('');

  let totalQuantity = 0;

  cart.forEach((cartItem) => {
    totalQuantity += cartItem.quantity;
  });

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  }

  const searchProduct = () => {
    console.log(search);
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <NavLink to="/" className="header-link">
            <img className="logo" src={assets.logo_white} />
            <img className="mobile-logo" src={assets.mobile_logo_white} />
          </NavLink>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" value={search} onChange={updateSearchInput} />

          <button className="search-button" onClick={searchProduct}>
            <img className="search-icon" src={assets.search_icon} />
          </button>
        </div>

        <div className="right-section">
          <NavLink className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </NavLink>

          <NavLink className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src={assets.cart_icon} />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;