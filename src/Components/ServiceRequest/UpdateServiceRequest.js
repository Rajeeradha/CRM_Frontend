import React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./serviceRequest.css";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { isAuthenticated } from '../Utils/auth';

const UpdateServiceRequest = () => {

    const params = useParams();
    const navigate = useNavigate();
    const {userID, token} = isAuthenticated();

    const [serviceRequestDetails, setServiceRequestDetails] = useState({
        caseNumber: "",
        clientName: "",
        email: "",
        caseReason: "",
        status: "",
      });

  useEffect(() => {
    const id = params.id.toString();

    axios.get(`${process.env.REACT_APP_BASE_URL}/${userID}/serviceRequest/${id}`, {headers: {"Authorization" : `Bearer ${token}`}}).then((response) =>{
        setServiceRequestDetails(response.data);
        console.log('Reponse: ', response.data);
    }).catch(error => {
        console.log('Error: ', error);
    })
}, [params.id,token])

const handleChange = (value) => {
    return setServiceRequestDetails((serviceRequest) => {
      return { ...serviceRequest, ...value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Service Request Details ", serviceRequestDetails);
    try{
        const id = params.id.toString();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/${userID}/serviceRequest/${id}`, serviceRequestDetails, {headers: {"Authorization" : `Bearer ${token}`}});
      if(response){
        setServiceRequestDetails({
            caseNumber: "",
            clientName: "",
            email: "",
            caseReason: "",
            status: "",
          });

          navigate('/serviceRequest');
      }
  }catch(error){
      console.log('Erro while adding service request: ', error);
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
            <Navbar.Brand className="fs-4">Service Request</Navbar.Brand>
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
        <h2>Update Service Request</h2>
      </div>
      <Form onSubmit={handleSubmit} className="container form my-2" >
      <Form.Group className="mb-3 col-md-4">
          <Form.Label>Case Number</Form.Label>
          <Form.Control type="number" id="number" placeholder="Enter case number"
          value={serviceRequestDetails.caseNumber}
          onChange={e => handleChange({ caseNumber: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Client Name</Form.Label>
          <Form.Control type="text" id="name" placeholder="Enter name"
          value={serviceRequestDetails.name}
          onChange={e => handleChange({ name: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>E-Mail</Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter email"
          value={serviceRequestDetails.email}
          onChange={e => handleChange({ email: e.target.value })}
         />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4">
          <Form.Label>Case Reason</Form.Label>
          <Form.Control type="text" id="reason" placeholder="Enter case reason"
          value={serviceRequestDetails.caseReason}
          onChange={e => handleChange({ caseReason: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3 col-md-4" controlId="role" 
        value={serviceRequestDetails.status}
        onChange={e => handleChange({ status: e.target.value })}>
        <Form.Label>Status</Form.Label>
        <Form.Select>
        <option>Select Status</option>
          <option value="Created">Created</option>
          <option value="Open">Open</option>
          <option value="In Process">In Process</option>
          <option value="Released">Released</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3 col-md-4" >UPDATE AN SERVICE REQUEST</Button>

      </Form>
    </>
  )
}

export default UpdateServiceRequest;
