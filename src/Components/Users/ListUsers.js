import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./users.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from "../Utils/auth";

const ListUsers = () => {
  const [usersList, setUsersList] = useState([]);
  const {userID, token} = isAuthenticated();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/${userID}/users`, {headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"}}
      );
      if (response) {
        setUsersList(response.data);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/${userID}/users/${id}`, {headers: {"Authorization" : `Bearer ${token}`, "Content-Type": "application/json"}}
      );
      if (response) {
        getUsers();
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
            <Navbar.Brand className="fs-3 fw-normal">Users</Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="fs-4">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/create-users" className="fs-4">
                Create User
              </Nav.Link>
            </Nav>
            <Nav className="d-flex">
            <Button variant="light" className="justify-content-end" onClick={handleSignout}>Sign out</Button>
            </Nav>
          </Container>
        </Navbar>

      <div className="center my-3">
        <h3>Users List</h3>
      </div>
      <Table responsive="sm" className="container">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-Mail</th>
            <th>Mobile Number</th>
            <th>Designation</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {usersList.map((users, index) => (
            <tr key={index}>
              <td>{users.name}</td>
              <td>{users.email}</td>
              <td>{users.mobileNumber}</td>
              <td>{users.designation}</td>
              {users.role === 1 ? <td>Admin</td> : <td>Employee</td>}
              <td>
                <Link className=" btn btn-warning" to={`/users/${users._id}/update-users`}>Edit</Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(users._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ListUsers;
