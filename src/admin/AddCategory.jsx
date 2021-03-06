import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";

import Layout from "../core/Layout";
import { addCategory } from "./apiAdmin";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setError("");
    setSuccess(false);
    setName(e.target.value);
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    // make request api to create category
    addCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={name}
          onChange={handleChange}
          autoFocus
          required
        />
      </div>
      <button type="submit" className="btn btn-outline-primary">
        Create Category
      </button>
    </form>
  );

  const showSuccess = () => {
    if (success) return <h3 className="text-success">{name} is created</h3>;
  };
  const showError = () => {
    if (error)
      return <h3 className="text-danger">Category should be unique</h3>;
  };
  const goBack = () => {
    return (
      <div className="mt-5">
        <Link to="/admin/dashboard" className="text-primary">
          Back to dashboard
        </Link>
      </div>
    );
  };

  return (
    <Layout
      title="Add a new category"
      description={`G'day ${user.name}, ready to add new category `}
      className="container"
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
