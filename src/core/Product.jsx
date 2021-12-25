import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(false);

  const { productId } = useParams();

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related product
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProducts(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    loadSingleProduct(productId);
  }, [productId]);

  return (
    <Layout
      title={product ? product.name : "Product"}
      className="container-fluid"
      description={
        product && product.description
          ? product.description.substring(0, 100)
          : ""
      }
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className="col-4">
          <h4>Related Product</h4>
          {relatedProducts.map((p, i) => {
            return (
              <div key={i} className="mb-3">
                <Card product={p} />
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
