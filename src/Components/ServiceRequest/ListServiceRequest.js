import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./serviceRequest.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../Utils/auth';

const ListServiceRequest = () => {
    const [serviceRequestList, setServiceRequestList] = useState([]);
    const {userID, token} = isAuthenticated();
  
    useEffect(() => {
        getServiceRequest();
    });
  
    const getServiceRequest = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/${userID}/serviceRequest`, {headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"}}
        );
        if (response) {
            setServiceRequestList(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/${userID}/serviceRequest/${id}`, {headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"}}
        );
        if (response) {
            getServiceRequest();
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }
    const navigate = useNavigate();
  
    const handleSignout = () => {
      localStorage.clear();
      navigate("/")
    }

  return (
    <>
      <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand className="fs-4 fw-normal">Service Request</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="fs-5">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/create-serviceRequest" className="fs-5">
                Create Service Request
              </Nav.Link>
            </Nav>
            <Nav className="d-flex">
            <Button variant="light" className="justify-content-end" onClick={handleSignout}>Sign out</Button>
            </Nav>
          </Container>
        </Navbar>

      <div className="center my-3">
        <h2>Service Request List</h2>
      </div>
      <Table responsive="sm" className="container">
        <thead>
          <tr>
            <th>Case Number</th>
            <th>Client Name</th>
            <th>E-Mail</th>
            <th>Case Reason</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {serviceRequestList.map((serviceRequest, index) => (
            <tr key={index}>
              <td>{serviceRequest.caseNumber}</td>
              <td>{serviceRequest.clientName}</td>
              <td>{serviceRequest.email}</td>
              <td>{serviceRequest.caseReason}</td>
              <td>{serviceRequest.status}</td>
              <td>
                <Link className=" btn btn-warning" to={`/serviceRequest/${serviceRequest._id}/update-serviceRequest`}>Edit</Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(serviceRequest._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default ListServiceRequest;
