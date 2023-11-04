import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./users.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { isAuthenticated } from '../Utils/auth';

const UpdateUsers = () => {

    const params = useParams();
    const navigate = useNavigate();
    const {userID, token} = isAuthenticated();

  const [userDetails, setUserDetail] = useState({
    name: "",
    email: "",
    password: "",
    mobileNumber: "",
    designation: "",
    role: 2,
  });

  useEffect(() => {
    const id = params.id.toString();

    axios.get(`${process.env.REACT_APP_BASE_URL}/${userID}/users/${id}`, {headers: {"Authorization" : `Bearer ${token}`}}).then((response) =>{
        setUserDetail(response.data);
        console.log('Reponse: ', response.data);
    }).catch(error => {
        console.log('Error: ', error);
    })
}, [params.id,token])

const handleChange = (value) => {
    return setUserDetail((users) => {
      return { ...users, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Users Details ", userDetails);
    try{
        const id = params.id.toString();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/${userID}/users/${id}`, userDetails, {headers: {"Authorization" : `Bearer ${token}`}});
      if(response){
        setUserDetail({
            name: "",
            email: "",
            password: "",
            mobileNumber: "",
            designation: "",
            role: 2,
          });

          navigate('/users');
      }
  }catch(error){
      console.log('Erro while register user: ', error);
  }
}

const handleSignout = () => {
  localStorage.clear();
  navigate("/")
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
            <Nav className="d-flex">
            <Button variant="light" className="justify-content-end" onClick={handleSignout}>Sign out</Button>
            </Nav>
          </Container>
        </Navbar>

      <div className="center my-3">
        <h2>Update Users</h2>
      </div>
      <Form onSubmit={handleSubmit} className="container form my-2" >
        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="name" placeholder="Enter Name"
          value={userDetails.name}
          onChange={e => handleChange({ name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email"
          value={userDetails.email}
          onChange={e => handleChange({ email: e.target.value })}
         />
        </Form.Group>

        {userDetails.password && <Form.Group className="mb-3 col-md-4">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" id="password" placeholder="Enter password"
          value={userDetails.password}
          onChange={e => handleChange({ password: e.target.value })}
          />
        </Form.Group>}

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" id="number" placeholder="Enter mobile number"
          value={userDetails.mobileNumber}
          onChange={e => handleChange({ mobileNumber: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Designation</Form.Label>
          <Form.Control type="text" id="designation" placeholder="Enter designation"
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
                        onChange={e => userDetails.role === 1 ? handleChange({role: 2}) : handleChange({role: 1})} /> {'Register as admin'}
                    </label>
                </div>

        <Button variant="primary" type="submit" className="mb-3 col-md-4 my-2" >UPDATE</Button>

      </Form>
    </>
  )
}

export default UpdateUsers;
