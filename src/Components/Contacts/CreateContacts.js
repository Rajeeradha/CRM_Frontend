import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import "./contacts.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const CreateContacts = () => {

    const navigate = useNavigate();
    const [contactDetails, setContactDetail] = useState({
      name: "",
      company: "",
      email: "",
      mobileNumber: "",
      title: "",
      department: "",
      address: "",
    });
  
    const handleChange = (value) => {
      return setContactDetail((contacts) => {
        return { ...contacts, ...value };
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log("Contacts Details ", contactDetails);
      try{
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/contacts`, contactDetails);
        if(response){
            setContactDetail({
            name: "",
            company: "",
            email: "",
            mobileNumber: "",
            title: "",
            department: "",
            address: "",
            });
  
            navigate('/contacts');
        }
    }catch(error){
        console.log('Error while adding contacts: ', error);
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
            <Navbar.Brand className="fs-3">Contacts</Navbar.Brand>
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
        <h2>Create Contacts</h2>
      </div>
      <Form onSubmit={handleSubmit} className="container form my-2" >
        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="name" placeholder="Enter Name" required
          value={contactDetails.name}
          onChange={e => handleChange({ name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" id="Company" placeholder="Enter company name" required
          value={contactDetails.company}
          onChange={e => handleChange({ company: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email" required
          value={contactDetails.email}
          onChange={e => handleChange({ email: e.target.value })}
         />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" id="number" placeholder="Enter mobile number" required
          value={contactDetails.mobileNumber}
          onChange={e => handleChange({ mobileNumber: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" id="title" placeholder="Enter title" required
          value={contactDetails.title}
          onChange={e => handleChange({ title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" id="department" placeholder="Enter department" required
          value={contactDetails.department}
          onChange={e => handleChange({ department: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" id="address" placeholder="Enter address" required
          value={contactDetails.address}
          onChange={e => handleChange({ address: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3 col-md-4" >CREATE AN CONTACT</Button>

      </Form>
    </>
  )
}

export default CreateContacts;
