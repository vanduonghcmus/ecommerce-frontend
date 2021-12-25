import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

import Layout from "../core/Layout";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Layout
      title="Manage Products"
      className="container-fluid"
      description="Manage CRUD on products"
    >
      <div className="row justify-content-center align-item-center">
        <div className="col-6">
          <h2 className="text-center">Total {products.length} products</h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => {
              return (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content-between align-items-center mb-3"
                >
                  <strong>{p.name}</strong>
                  <div className="d-flex justify-content-between">
                    <Link to={`/admin/product/update/${p._id}`}>
                      <span className="badge badge-warning badge-pill">
                        Update
                      </span>
                    </Link>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => destroy(p._id)}
                      className="ml-3"
                    >
                      <span className="badge badge-danger badge-pill">
                        Delete
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
