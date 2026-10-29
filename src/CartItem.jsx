import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  removeItem,
  updateQuantity,
  selectCartItems,
} from "./CartSlice";
import "./CartItem.css";

function Navbar({ totalItems }) {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        Paradise Nursery
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart" className="cart-link">
          🛒 Cart
          <span className="cart-quantity">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}

export default function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);

  // Calculate the total quantity of items in the cart.
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate each item's subtotal and the complete cart total.
  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price ?? item.cost) || 0) * item.quantity,
    0
  );

  // Increase the quantity of a plant.
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease the quantity or remove the plant when quantity reaches zero.
  const handleDecrement = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  // Remove a plant from the cart.
  const handleDelete = (item) => {
    dispatch(removeItem(item.name));
  };

  // Return to the product listing page.
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      navigate("/plants");
    }
  };

  // Checkout placeholder for the assignment.
  const handleCheckout = () => {
    window.alert("Checkout Coming Soon!");
  };

  return (
    <div className="shopping-cart-page">
      <Navbar totalItems={totalItems} />

      <div className="cart-page-content">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty!</h2>

            <p>
              Looks like you haven't added any plants to your cart yet.
            </p>

            <button
              type="button"
              className="continue-shopping-button"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-container">
              {cartItems.map((item) => {
                const unitPrice =
                  Number(item.price ?? item.cost) || 0;

                const subtotal = unitPrice * item.quantity;

                return (
                  <div className="cart-item" key={item.name}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-item-image"
                    />

                    <div className="cart-item-details">
                      <h3>{item.name}</h3>

                      <p className="unit-price">
                        Unit Price: ${unitPrice.toFixed(2)}
                      </p>

                      <p className="item-subtotal">
                        Subtotal: ${subtotal.toFixed(2)}
                      </p>
                    </div>

                    <div className="quantity-controls">
                      <button
                        type="button"
                        className="quantity-button"
                        onClick={() => handleDecrement(item)}
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        −
                      </button>

                      <span className="item-quantity">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="quantity-button"
                        onClick={() => handleIncrement(item)}
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDelete(item)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <h2>
                Total Items: {totalItems}
              </h2>

              <h2>
                Total Amount: ${totalAmount.toFixed(2)}
              </h2>

              <div className="cart-actions">
                <button
                  type="button"
                  className="continue-shopping-button"
                  onClick={handleContinueShopping}
                >
                  Continue Shopping
                </button>

                <button
                  type="button"
                  className="checkout-button"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}