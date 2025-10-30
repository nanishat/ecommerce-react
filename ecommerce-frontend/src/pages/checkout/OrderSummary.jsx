import dayjs from "dayjs";
import formatCurrency from "../../utils/formatCurrency";
import CartItemDetails from "./CartItemDetails";
import DeliveryDate from "./DeliveryDate";

function OrderSummary({ cart, deliveryOptions }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 && cart.map((cartItem) => {

        const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
          return deliveryOption.id === cartItem.deliveryOptionId;
        });

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate selectedDeliveryOption={selectedDeliveryOption} />

            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={cartItem} />

              <div className="delivery-options">
                <div className="delivery-options-title">
                  Choose a delivery option:
                </div>
                {deliveryOptions.map((deliveryOption) => {
                  let priceString = 'FREE Shipping';

                  if (deliveryOption.priceCents > 0) {
                    priceString = `${formatCurrency(deliveryOption.priceCents)} - Shipping`;
                  }

                  return (
                    <div key={deliveryOption.id} className="delivery-option">
                      <input type="radio"
                        checked={deliveryOption.id === cartItem.deliveryOptionId}
                        className="delivery-option-input"
                        name={`delivery-option-${cartItem.productId}`} />
                      <div>
                        <div className="delivery-option-date">
                          {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                        </div>
                        <div className="delivery-option-price">
                          {priceString}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OrderSummary;