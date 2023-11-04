import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./leads.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from "../Utils/auth";

const ListLeads = () => {
  const [leadsList, setLeadsList] = useState([]);
  const {userID, token} = isAuthenticated();


  useEffect(() => {
    getLeads();
  });

  const getLeads = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/${userID}/leads`, {headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"}}
      );
      if (response) {
        setLeadsList(response.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/${userID}/leads/${id}`, {headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"}}
      );
      if (response) {
        getLeads();
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
            <Navbar.Brand className="fs-3 fw-normal">Leads</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="fs-4">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/create-leads" className="fs-4">
                Create Leads
              </Nav.Link>
            </Nav>
            <Nav className="d-flex">
            <Button variant="light" className="justify-content-end" onClick={handleSignout}>Sign out</Button>
            </Nav>
          </Container>
        </Navbar>

      <div className="center my-3">
        <h2>Leads List</h2>
      </div>
      <Table responsive="sm" className="container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>E-Mail</th>
            <th>Mobile Number</th>
            <th>Lead Source</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {leadsList.map((leads, index) => (
            <tr key={index}>
              <td>{leads.name}</td>
              <td>{leads.company}</td>
              <td>{leads.email}</td>
              <td>{leads.mobileNumber}</td>
              <td>{leads.leadSource}</td>
              <td>{leads.status}</td>
              <td>
                <Link className=" btn btn-warning" to={`/leads/${leads._id}/update-leads`}>Edit</Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(leads._id)}
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

export default ListLeads;
