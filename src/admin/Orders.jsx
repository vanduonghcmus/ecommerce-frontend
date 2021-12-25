import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";
import moment from "moment";

import Layout from "../core/Layout";
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">Total orders: {orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger ">No orders</h1>;
    }
  };

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input type="text" className="form-control" value={value} readOnly />
      </div>
    );
  };

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log("Status updated fail");
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => {
    return (
      <div className="form-group">
        <h3 className="mark mb-4">Status: {o.status}</h3>
        <select
          className="custom-select"
          onChange={(e) => handleStatusChange(e, o._id)}
          placeholder="Update Status"
        >
          {statusValues.map((status, idx) => {
            return (
              <option value={status} selected={status === o.status} key={idx}>
                {status}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  return (
    <Layout
      title="Orders"
      description={`G'day ${user.name}, you can manage all orders here`}
      className="container"
    >
      <div className="row pb-2">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {orders.map((o, oIdx) => {
            return (
              <div
                className="mt-5"
                key={oIdx}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="bg-primary">Order: {o._id}</h2>
                <ul class="list-group">
                  <li class="list-group-item">{showStatus(o)}</li>
                  <li class="list-group-item">
                    Transaction ID: {o.transaction_id}
                  </li>
                  <li class="list-group-item">Amount: ${o.amount}</li>
                  <li class="list-group-item">
                    Ordered by: {o.user && o.user.name}
                  </li>
                  <li class="list-group-item">
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li class="list-group-item">Delivery address: {o.address}</li>
                </ul>
                <h3 className="m-4 font-italic">
                  Total products in the order: {o.products.length}
                </h3>
                {o.products.map((p, pIdx) => {
                  return (
                    <div
                      className="mb-4"
                      key={pIdx}
                      style={{
                        padding: "20px",
                        borderBottom: "1px solid indigo",
                      }}
                    >
                      {showInput("Product name", p.name)}
                      {showInput("Product price", p.price)}
                      {showInput("Product total", p.count)}
                      {showInput("Product ID", p._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
