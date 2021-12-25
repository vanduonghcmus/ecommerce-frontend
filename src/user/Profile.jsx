import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Layout from "../core/Layout";
import { read, update, updateUser } from "./apiUser";

const Profile = (props) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  });

  const userId = props.match.params.userId;

  const { token } = isAuthenticated();
  const { success, email, error, name, password } = profile;

  const init = (userId) => {
    // console.log("userId", userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setProfile({ ...profile, error: true });
      } else {
        setProfile({ ...profile, email: data.email, name: data.name });
      }
    });
  };

  useEffect(() => {
    // location get in private route
    init(userId);
  }, []);

  const handleChange = (name) => (e) => {
    setProfile({ ...profile, error: false, [name]: e.target.value });
  };

  const clickSubmit = (e) => {
    e.preventDefault();
    update(userId, token, { name, email, password }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        updateUser(data, () => {
          setProfile({
            ...profile,
            name: data.name,
            email: data.email,
            password: data.password,
            success: true,
          });
        });
      }
    });
  };

  const showUpdateProfile = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-mute">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={handleChange("name")}
        />
      </div>
      <div className="form-group">
        <label className="text-mute">Email</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("email")}
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-mute">Password</label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange("password")}
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />;
    }
  };

  return (
    <Layout
      title="Profile"
      className="container-fluid"
      description="Update to profile"
    >
      <div className="row justify-content-center">
        <div className="col-4">
          <h2>Profile</h2>
          {showUpdateProfile(name, email, password)}
          {redirectUser(success)}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
