import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth";

import Layout from "../core/Layout";
import { createProduct, getCategories } from "./apiAdmin";

const AddProduct = () => {
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
  const innit = () => {
    getCategories().then((data) => {
      if (data.error) {
        setFormValues({ ...formValues, error: data.error });
      } else {
        setFormValues({
          ...formValues,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    innit();
  }, []);

  const handleChange = (name) => (e) => {
    // if name='photo' get target.file else target.value
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setFormValues({ ...formValues, [name]: value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setFormValues({ ...formValues, error: "", loading: true });

    createProduct(user._id, token, formData).then((data) => {
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
            defaultValue={category}
            className="custom-select"
          >
            <option value="">Please Select</option>
            {categories.map((category, i) => {
              return (
                <option key={i} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select
            onChange={handleChange("shipping")}
            defaultValue={shipping}
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

        <button className="btn btn-outline-primary">Create Product</button>
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
      <h2>{`${createdProduct} is created`}</h2>
    </div>
  );
  const showLoading = () =>
    loading && (
      <div className="alert alert-success">
        <h2>Loading...</h2>
      </div>
    );

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
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
