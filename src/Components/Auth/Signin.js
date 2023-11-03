import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Signin.css";
import Logo from "./logo.jpg";

const Signin = () => {
  const navigate = useNavigate();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (value) => {
    return setUserCredentials(() => {
      return { ...userCredentials, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/signin`,
        userCredentials
      );
      console.log("User signed in successfully ", response);
      await localStorage.setItem("userData", JSON.stringify(response.data));
      navigate("/home");
    } catch (error) {
      console.log("Error while signing in user: ", error);
    }
  };

  return (
    <>
      <div className="signin-layout">
        <div className="alert alert-success fixed-top" role="alert">
        Since backend (server-side) of this application is deployed on "Render", the application may be bit slower in the start, please wait it get loads...
        </div>
        <div className="signin-box">
          <div className="signin-header">
            <div>
              <img src={Logo} alt="" className="signin-header-logo" />
            </div>
            <h1 className="signin-header-title">Welcome to SalesHub CRM</h1>
            <p className="signin-header-subtitle">Signin to your account</p>
          </div>

          <div className="signin-body">
            <Form
              onSubmit={handleSubmit}
              className="container my-3 signin-form"
            >
              <div className="input-field">
                <Form.Group>
                  <Form.Label className="input-label">E-Mail</Form.Label>
                  <Form.Control
                    className="input-control"
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    autoComplete="off"
                    required
                    value={userCredentials.email}
                    onChange={(e) => handleChange({ email: e.target.value })}
                  />
                </Form.Group>
              </div>
              <div className="input-field">
                <Form.Group>
                  <Form.Label className="input-label">Password</Form.Label>
                  <Form.Control
                    className=" input-control"
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    autoComplete="off"
                    required
                    value={userCredentials.password}
                    onChange={(e) => handleChange({ password: e.target.value })}
                  />
                </Form.Group>
              </div>
              <div className="flex-end">
                <Link to={"forgot-password"} className="link-end">
                  Forgot password?
                </Link>
              </div>
              <Button variant="primary" type="submit" className="btn-submit">
                <span className="btn-text">SIGN IN</span>
              </Button>
            </Form>
            <p className="text-center">
              Not a User?{" "}
              <Link to={"/create-users"} className="link-text-center">
                Create account here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
