import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "./leads.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const CreateLeads = () => {
    const navigate = useNavigate();
  const [leadDetails, setLeadDetail] = useState({
    name: "",
    company: "",
    email: "",
    mobileNumber: "",
    leadSource: "",
    status: "",
  });

  const handleChange = (value) => {
    return setLeadDetail((leads) => {
      return { ...leads, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Leads Details ", leadDetails);
    try{
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/leads`, leadDetails);
      if(response){
        setLeadDetail({
          name: "",
          company: "",
          email: "",
          mobileNumber: "",
          leadSource: "",
          status: "",
          });

          navigate('/leads');
      }
  }catch(error){
      console.log('Erro while adding leads: ', error);
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
            <Navbar.Brand className="fs-3">Leads</Navbar.Brand>
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
        <h2>Create Leads</h2>
      </div>

      <Form onSubmit={handleSubmit} className="container form my-2" >
        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="name" placeholder="Enter Name" required
          value={leadDetails.name}
          onChange={e => handleChange({ name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" id="name" placeholder="Enter company name" required
          value={leadDetails.company}
          onChange={e => handleChange({ company: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email" required
          value={leadDetails.email}
          onChange={e => handleChange({ email: e.target.value })}
         />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" id="number" placeholder="Enter mobile number" required
          value={leadDetails.mobileNumber}
          onChange={e => handleChange({ mobileNumber: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Lead Source</Form.Label>
          <Form.Control type="text" id="designation" placeholder="Enter lead source" required
          value={leadDetails.leadSource}
          onChange={e => handleChange({ leadSource: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4" controlId="role" 
        value={leadDetails.status}
        onChange={e => handleChange({ status: e.target.value })}>
        <Form.Label>Status</Form.Label>
        <Form.Select>
        <option>Select Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Confirmed">Confirmed</option>
        </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3 col-md-4" >CREATE AN LEAD</Button>

      </Form>
    </>
  )
}

export default CreateLeads;
