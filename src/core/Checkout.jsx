import React, { useState, useEffect } from "react";
import PropType from "prop-types";
import { Link, useHistory } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

import { isAuthenticated } from "../auth";
import { getBraintreeClienToken, processPayment, createOrder } from "./apiCore";

const Checkout = ({ products, onEmptyCart }) => {
  const authenticated = isAuthenticated();

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  let deliveryAddress = data.address;

  const [loading, setLoading] = useState(false);
  const { go } = useHistory();

  const userId = authenticated && authenticated.user._id;
  const token = authenticated && authenticated.token;

  const getToken = (userId, token) => {
    getBraintreeClienToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error });
      } else {
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, [userId, token]);

  const getTotal = (products) => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const buy = () => {
    setLoading(true);
    // send the nonce to your server
    // nonce => data.instance.requestPayment method
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((res) => {
            // create order
            const createOrderData = {
              products: products,
              transaction_id: res.transaction.id,
              amount: res.transaction.amount,
              address: deliveryAddress,
            };
            createOrder(userId, token, createOrderData);
            setData({ ...data, success: res.success });
            // empty cart
            onEmptyCart();
            go(0);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setData({ ...data, error: err.message });
        setLoading(false);
      });
  };

  const handleAddress = (e) => {
    setData({ ...data, address: e.target.value });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <div className="form-group mb-3">
            <label className="text-muted">Delivery Address:</label>
            <textarea
              onChange={handleAddress}
              className="form-control"
              value={data.address}
              placeholder="Type your Delivery address here..."
            />
          </div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: "vault",
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />

          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showCheckout = () => {
    return authenticated ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    );
  };

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = (success) => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      Thanks Your payment was success
    </div>
  );

  const showLoading = (loading) => loading && <h2>Loading...</h2>;

  return (
    <div>
      <h2>Total: ${getTotal(products)}</h2>
      {showLoading(loading)}
      {showError(data.error)}
      {showSuccess(data.success)}
      {showCheckout()}
    </div>
  );
};

Checkout.propTypes = {
  products: PropType.array.isRequired,
  onEmptyCart: PropType.func.isRequired,
};

export default Checkout;
