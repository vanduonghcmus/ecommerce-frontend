import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";

const Signin = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferer: false,
  });

  const { email, password, error, loading, redirectToReferer } = formValues;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setFormValues({ ...formValues, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setFormValues({ ...formValues, error: false, loading: true });
    signin({ email, password }).then((data) => {
      if (data.error) {
        setFormValues({ ...formValues, error: data.error, loading: false });
      } else {
        authenticate(data, () =>
          setFormValues({
            ...formValues,
            redirectToReferer: true,
          })
        );
      }
    });
  };

  const signInForm = () => (
    <form>
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

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h2>Loading ...</h2>
      </div>
    );

  const redirectUser = () => {
    if (redirectToReferer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Layout
      title="Signin"
      description="Signin to Node React E-commerce App"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}

      {signInForm()}
      {redirectUser()}
    </Layout>
  );
};
export default Signin;
