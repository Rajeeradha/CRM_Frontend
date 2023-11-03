import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./contacts.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../Utils/auth';

const ListContacts = () => {

    const [contactsList, setContactsList] = useState([]);
    const {userID, token} = isAuthenticated();
  
    useEffect(() => {
        getContacts();
    }, []);
  
    const getContacts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/${userID}/contacts`, {headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"}}
        );
        if (response) {
            setContactsList(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
  
    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(
          `${process.env.REACT_APP_BASE_URL}/${userID}/contacts/${id}`, {headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"}}
        );
        if (response) {
            getContacts();
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
            <Navbar.Brand className="fs-3 fw-normal">Contacts</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="fs-4">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/create-contacts" className="fs-4">
                Create Contacts
              </Nav.Link>
            </Nav>
            <Nav className="d-flex">
            <Button variant="light" className="justify-content-end" onClick={handleSignout}>Sign out</Button>
            </Nav>
          </Container>
        </Navbar>

      <div className="center my-3">
        <h2>Contacts List</h2>
      </div>
      <Table responsive="sm" className="container">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>E-Mail</th>
            <th>Mobile Number</th>
            <th>Title</th>
            <th>Department</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {contactsList.map((contacts, index) => (
            <tr key={index}>
              <td>{contacts.name}</td>
              <td>{contacts.company}</td>
              <td>{contacts.email}</td>
              <td>{contacts.mobileNumber}</td>
              <td>{contacts.title}</td>
              <td>{contacts.department}</td>
              <td>{contacts.address}</td>
              <td>
                <Link className=" btn btn-warning" to={`/contacts/${contacts._id}/update-contacts`}>Edit</Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(contacts._id)}
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

export default ListContacts
