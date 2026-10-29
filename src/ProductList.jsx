import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, selectCartItems } from "./CartSlice";
import "./ProductList.css";

const plantsArray = {
  "Air Purifying Plants": [
    {
      name: "Snake Plant",
      price: 18,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500",
      description: "Hardy plant that adds natural beauty to your home.",
    },
    {
      name: "Peace Lily",
      price: 22,
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500",
      description: "Elegant green foliage with beautiful white flowers.",
    },
    {
      name: "Spider Plant",
      price: 15,
      image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=500",
      description: "An easy-care plant perfect for indoor spaces.",
    },
    {
      name: "Areca Palm",
      price: 28,
      image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=500",
      description: "A tropical palm that brightens up any room.",
    },
    {
      name: "Rubber Plant",
      price: 25,
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500",
      description: "Glossy leaves make this plant a striking centerpiece.",
    },
    {
      name: "Boston Fern",
      price: 20,
      image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500",
      description: "Lush, feathery foliage for a refreshing green corner.",
    },
  ],

  "Aromatic Fragrant Plants": [
    {
      name: "Lavender",
      price: 16,
      image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500",
      description: "Fragrant flowers that bring a calming atmosphere.",
    },
    {
      name: "Jasmine",
      price: 19,
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
      description: "Delicate flowers known for their sweet fragrance.",
    },
    {
      name: "Rosemary",
      price: 12,
      image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500",
      description: "An aromatic herb for kitchens and sunny windowsills.",
    },
    {
      name: "Mint",
      price: 10,
      image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=500",
      description: "Fresh, fragrant leaves for everyday use.",
    },
    {
      name: "Lemon Balm",
      price: 14,
      image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=500",
      description: "A refreshing herb with a gentle lemon scent.",
    },
    {
      name: "Gardenia",
      price: 24,
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500",
      description: "Beautiful flowers with a rich, sweet fragrance.",
    },
  ],

  "Decorative Plants": [
    {
      name: "Monstera",
      price: 30,
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500",
      description: "Distinctive split leaves for a modern interior.",
    },
    {
      name: "Fiddle Leaf Fig",
      price: 35,
      image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500",
      description: "Large sculptural leaves that make a bold statement.",
    },
    {
      name: "Pothos",
      price: 14,
      image: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=500",
      description: "Trailing green foliage that looks lovely on shelves.",
    },
    {
      name: "Calathea",
      price: 26,
      image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500",
      description: "Decorative foliage with beautiful natural patterns.",
    },
    {
      name: "ZZ Plant",
      price: 21,
      image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=500",
      description: "A low-maintenance plant with glossy green leaves.",
    },
    {
      name: "Chinese Money Plant",
      price: 23,
      image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=500",
      description: "Rounded leaves bring a playful look to your space.",
    },
  ],
};

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
          <span className="cart-quantity">
            {totalItems}
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);

  const [addedToCart, setAddedToCart] = useState({});

  const [notice, setNotice] = useState("");

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleAddToCart = (plant) => {
    if (
      addedToCart[plant.name] ||
      cartItems.some((item) => item.name === plant.name)
    ) {
      return;
    }

    dispatch(addItem(plant));

    setAddedToCart((previous) => ({
      ...previous,
      [plant.name]: true,
    }));

    setNotice(`${plant.name} added to cart!`);

    window.setTimeout(() => {
      setNotice("");
    }, 2000);
  };

  return (
    <div className="plants-page">
      <Navbar totalItems={totalItems} />

      <div className="section-heading">
        <p className="eyebrow">GROW SOMETHING BEAUTIFUL</p>

        <h1>Our Plant Collection</h1>

        <p>
          Discover beautiful plants to bring freshness,
          peace, and natural beauty into your home.
        </p>
      </div>

      {notice && (
        <div className="toast-message" role="status">
          {notice}
        </div>
      )}

      {Object.entries(plantsArray).map(([category, plants]) => (
        <section className="plant-category" key={category}>
          <h2>{category}</h2>

          <div className="product-list">
            {plants.map((plant) => {
              const isAdded =
                Boolean(addedToCart[plant.name]) ||
                cartItems.some((item) => item.name === plant.name);

              return (
                <article className="plant-card" key={plant.name}>
                  <img
                    src={plant.image}
                    alt={plant.name}
                    className="plant-image"
                    loading="lazy"
                  />

                  <div className="plant-card-content">
                    <h3>{plant.name}</h3>

                    <p className="plant-description">
                      {plant.description}
                    </p>

                    <p className="plant-price">
                      ${plant.price.toFixed(2)}
                    </p>

                    <button
                      type="button"
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isAdded}
                    >
                      {isAdded ? "Added to Cart ✓" : "Add to Cart"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}