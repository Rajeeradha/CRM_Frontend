import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';

const Topbar = () => {

  const navigate = useNavigate();
  const handleSignout = () => {
    localStorage.clear();
    navigate("/")
  }
  
  return (

    <Navbar bg="dark" variant="dark" className="navbar fixed-top navbar-expand-md">
    <Container>
      <Navbar.Brand className="h1" style={{fontSize:"30px"}}>SALESHUB</Navbar.Brand>
      <Nav className="d-flex">
      <Button variant="light" className="justify-content-end" onClick={handleSignout}>Sign out</Button>
      </Nav>
    </Container>
  </Navbar>
  );
};
export default Topbar;
