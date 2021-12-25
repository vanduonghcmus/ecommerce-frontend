import React, { useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../core/Layout";
import { signup } from "../auth";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = formValues;

  const handleChange = (name) => (event) => {
    setFormValues({ ...formValues, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, error: false });
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        setFormValues({ ...formValues, error: data.error, success: false });
      } else {
        setFormValues({
          ...formValues,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          name="name"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          onChange={handleChange("email")}
          type="email"
          name="email"
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={handleChange("password")}
          type="password"
          name="password"
          className="form-control"
          autoComplete="false"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );

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
      style={{ display: success ? "" : "none" }}
    >
      New account is created. <Link to="/signin">Please signin</Link>
    </div>
  );

  return (
    <Layout
      title="Signup"
      description="Signup to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}

      {signUpForm()}
    </Layout>
  );
};
export default Signup;
