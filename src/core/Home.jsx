import React, { useState, useEffect } from "react";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";
import Search from "./Search";

const Home = () => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductBySell(data);
      }
    });
  };

  const loadProductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductBySell();
    loadProductByArrival();
  }, []);

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  return (
    <Layout
      title="Home Page"
      className="container-fluid"
      description="Node React E-commerce App"
    >
      <Search />
      {showError()}
      <h2 className="mb-4">New Arrivals</h2>
      <div className="row mx-0">
        {productByArrival.map((product, i) => {
          return (
            <div key={i} className="col-xs-12 col-sm-4 col-lg-3 mb-3">
              <Card product={product} />
            </div>
          );
        })}
      </div>

      <h2 className="mb-4">Best Sellers</h2>
      <div className="row mx-0">
        {productBySell.map((product, i) => {
          return (
            <div key={i} className="col-xs-12 col-sm-4 col-lg-3 mb-3">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Layout>
  );
};
export default Home;
