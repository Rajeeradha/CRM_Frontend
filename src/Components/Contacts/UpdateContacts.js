import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./contacts.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { isAuthenticated } from '../Utils/auth';

const UpdateContacts = () => {

   // const params = useParams();
    const navigate = useNavigate();
    const {userID, token} = isAuthenticated();

    const [contactDetails, setContactDetail] = useState({
        name: "",
        company: "",
        email: "",
        mobileNumber: "",
        title: "",
        department: "",
        address: "",
      });
    
      useEffect(() => {
        const id = params.id.toString();
    
        axios.get(`${process.env.REACT_APP_BASE_URL}/${userID}/contacts/${id}`, {headers: {"Authorization" : `Bearer ${token}`}}).then((response) =>{
            setContactDetail(response.data);
            console.log('Reponse: ', response.data);
        }).catch(error => {
            console.log('Error: ', error);
        })
    }, [userID,token])
    
    const handleChange = (value) => {
        return setContactDetail((contacts) => {
          return { ...contacts, ...value };
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Contacts Details ", contactDetails);
        try{
            const id = userID.toString();
          const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/${userID}/contacts/${id}`, contactDetails, {headers: {"Authorization" : `Bearer ${token}`}});
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
          console.log('Erro while adding contacts: ', error);
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
        <h2>Update Contacts</h2>
      </div>
      <Form onSubmit={handleSubmit} className="container form my-2" >
        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="name" placeholder="Enter Name"
          value={contactDetails.name}
          onChange={e => handleChange({ name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Company</Form.Label>
          <Form.Control type="text" id="company" placeholder="Enter company name"
          value={contactDetails.company}
          onChange={e => handleChange({ company: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email"
          value={contactDetails.email}
          onChange={e => handleChange({ email: e.target.value })}
         />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control type="number" id="number" placeholder="Enter mobile number"
          value={contactDetails.mobileNumber}
          onChange={e => handleChange({ mobileNumber: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" id="title" placeholder="Enter title"
          value={contactDetails.title}
          onChange={e => handleChange({ title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" id="department" placeholder="Enter department"
          value={contactDetails.department}
          onChange={e => handleChange({ department: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" id="address" placeholder="Enter address"
          value={contactDetails.address}
          onChange={e => handleChange({ address: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3 col-md-4" >UPDATE AN CONTACT</Button>

      </Form>
    </>
  )
}

export default UpdateContacts;
