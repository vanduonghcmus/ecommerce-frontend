import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

import Layout from "../core/Layout";
import { getProduct, getCategories, updateProduct } from "./apiAdmin";

const UpdateProduct = ({ match }) => {
  const productId = match.params.productId;

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirectToProfile: false,
    formData: new FormData(),
  });
  const { user, token } = isAuthenticated();

  const {
    categories,
    category,
    createdProduct,
    description,
    error,
    formData,
    loading,
    name,
    photo,
    price,
    quantity,
    redirectToProfile,
    shipping,
  } = formValues;

  // Load categories and set form Data
  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setFormValues({ ...formValues, error: data.error });
      } else {
        setFormValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setFormValues({ ...formValues, error: data.error });
      } else {
        console.log("data", data);
        // populate state
        // get categories
        setFormValues({
          ...formValues,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          shipping: data.shipping,
          quantity: data.quantity,
          formData: new FormData(),
        });
        initCategories();
      }
    });
  };

  useEffect(() => {
    init(productId);
  }, []);

  console.log("category", category);

  const handleChange = (name) => (e) => {
    // if name='photo' get target.file else target.value
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, error: "", loading: true });

    updateProduct(productId, user._id, token, formData).then((data) => {
      if (data.error) {
        setFormValues({ ...formValues, error: data.error });
      } else {
        setFormValues({
          ...formValues,
          name: "",
          price: "",
          description: "",
          category: "",
          quantity: "",
          shipping: "",
          loading: false,
          createdProduct: data.name,
          redirectToProfile: true,
        });
      }
    });
  };

  const newPostForm = () => {
    return (
      <form id="formData" className="mb-3" onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image/*"
              value={photo}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange("name")}
            value={name}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange("description")}
            value={description}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            type="number"
            onChange={handleChange("price")}
            value={price}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select
            onChange={handleChange("category")}
            value={category ? category : ""}
            className="custom-select"
          >
            <option value="">Please Select</option>
            {categories.map((c, i) => {
              return (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select
            onChange={handleChange("shipping")}
            value={!shipping ? "1" : "0"}
            className="custom-select"
          >
            <option value="">Please Select</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            onChange={handleChange("quantity")}
            value={quantity}
            className="form-control"
          />
        </div>

        <button className="btn btn-outline-primary">Update Product</button>
      </form>
    );
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct} is updated`}</h2>
    </div>
  );
  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to={"/"} />;
      }
    }
  };

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, ready to add new product `}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showError()}
          {showSuccess()}
          {showLoading()}
          {newPostForm()}
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
