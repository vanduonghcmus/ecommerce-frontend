import React, { useState } from "react";
import PropType from "prop-types";
import { Link, Redirect } from "react-router-dom";
import moment from "moment";

import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelper";
import "../styles.css";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  updateCartState,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary m-2">View Product</button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true);
    });
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showRemoveProduct = (showRemoveButton) => {
    return (
      showRemoveButton && (
        <button
          onClick={() => {
            const cartWhenRemove = removeItem(product._id);
            updateCartState(cartWhenRemove);
          }}
          className="btn btn-outline-danger m-2"
        >
          Remove product
        </button>
      )
    );
  };
  const showAddToCart = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning m-2">
          Add to card
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-pill badge-primary">In Stock</span>
    ) : (
      <span className="badge badge-pill badge-light">Out Of Stock</span>
    );
  };

  const handleChange = (productId) => (e) => {
    if (e.target.value <= product.quantity) {
      setCount(e.target.value < 1 ? 1 : e.target.value);
      if (e.target.value >= 1) {
        const cartWhenUpdate = updateItem(productId, e.target.value);
        updateCartState(cartWhenUpdate);
      }
    }
  };

  const showCartUpdateOptions = (isShow) => {
    return (
      isShow && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  return (
    <div className="card">
      <div className="card-header name">{product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage url="product" item={product} />
        <p className="lead">{product.description.substr(0, 100)}</p>
        <p className="black-10">${product.price}</p>
        <p className="black-9">
          Category: {product.category && product.category.name}
        </p>
        <p className="black-8">
          Added on {moment(product.createdAt).fromNow()}
        </p>
        {showStock(product.quantity)}
        <br />
        {showViewButton(showViewProductButton)}
        {showAddToCart(showAddToCartButton)}
        {showRemoveProduct(showRemoveProductButton)}
        {showCartUpdateOptions(cartUpdate)}
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropType.object.isRequired,
  showViewProductButton: PropType.bool,
  showAddToCartButton: PropType.bool,
  showCartUpdateOptions: PropType.bool,
};

export default Card;
