import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Card from "./Card";
import Layout from "./Layout";
import { getCart, emptyCart } from "./cartHelper";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cartItems = getCart();
    setItems(cartItems);
  }, []);

  const updateCartState = (carts) => {
    setItems(carts);
  };

  const handleEmptyCart = () => {
    setItems([]);
    emptyCart(() => {
      console.log("payment success and empty cart");
    });
  };

  const showItems = () => {
    return (
      <div>
        <h2 className="mb-4">Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            product={product}
            key={i}
            showAddToCartButton={false}
            showRemoveProductButton={true}
            cartUpdate={true}
            updateCartState={updateCartState}
          />
        ))}
      </div>
    );
  };

  const noItemMessage = () => {
    return (
      <h2>
        Your cart is empty.
        <br />
        <Link to="/shop">Continue shop page</Link>
      </h2>
    );
  };

  return (
    <Layout
      title="Shopping Cart"
      className="container-fluid"
      description="Manage your cart items. And remove checkout and continue shopping"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems() : noItemMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} onEmptyCart={handleEmptyCart} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
