import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <>
      <div className="reset-layout">
        <div className="reset-box">
          <div className="reset-header">
            <h1 className="reset-header-title">Reset your password</h1>
          </div>

          <div className="reset-body">
            <Form className="container my-3 reset-form">
              <div className="input-field">
                <Form.Group>
                  <Form.Label className="input-label">Registered E-Mail</Form.Label>
                  <Form.Control
                    className="input-control"
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    autoComplete="off"
                    required
                  />
                </Form.Group>
              </div>
              <Button variant="primary" type="submit" className="btn-submit">
                SUBMIT
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;