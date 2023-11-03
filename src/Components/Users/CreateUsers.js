import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "./users.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const CreateUsers = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    designation: "",
    role: 2,
  });

  const handleChange = (value) => {
    return setUserDetail((users) => {
      return { ...users, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Users Details ", userDetails);
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, userDetails);
      if(response){
        setUserDetail({
            name: "",
            email: "",
            password: "",
            mobileNumber: "",
            designation: "",
            role: 2,
          });

          navigate('/');
      }
  }catch(error){
      console.log('Error while register user: ', error);
  }
}

  return (
    <>
    <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="fs-3">Users</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="fs-4">
                Home
              </Nav.Link>
              </Nav>
          </Container>
        </Navbar>

      <div className="center my-3">
        <h2>Create Users</h2>
      </div>
      <Form onSubmit={handleSubmit} className="container form my-2" >
        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="name" placeholder="Enter Name" required
          value={userDetails.name}
          onChange={e => handleChange({ name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email" required
          value={userDetails.email}
          onChange={e => handleChange({ email: e.target.value })}
         />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="password" placeholder="Enter password" required
          value={userDetails.password}
          onChange={e => handleChange({ password: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" id="number" placeholder="Enter mobile number" required
          value={userDetails.mobileNumber}
          onChange={e => handleChange({ mobileNumber: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Designation</Form.Label>
          <Form.Control type="text" id="designation" placeholder="Enter designation" required
          value={userDetails.designation}
          onChange={e => handleChange({ designation: e.target.value })}
          />
        </Form.Group>

                <div className='form-group'>
                    <label>
                        <input id='role'  
                        type='checkbox' 
                        value={userDetails.role} 
                        checked={userDetails.role === 1} 
                        onChange={e => userDetails.role === 1 ? handleChange({role: 2}) : handleChange({role: 1})} /> {'Register as Admin'}
                    </label>
                </div>

        <Button variant="primary" type="submit" className="mb-3 col-md-4 my-2" >REGISTER</Button>

      </Form>
    </>
  );
};

export default CreateUsers;
