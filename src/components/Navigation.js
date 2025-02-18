import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo.png';
import LoginContext from "../LoginContext";

const mainLinks = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Events" },
  { path: "/projects", label: "Projects" },
  { path: "/committee", label: "Committee" },
  { path: "/gallery", label: "Gallery" },
  { path: "/about", label: "About us" }
];

const adminLinks = [
  { path: "/admin/dashboard/articles", label: "Projects" },
  { path: "/admin/dashboard/events", label: "Events" },
  { path: "/admin/dashboard/committee", label: "Committee" },
  //{ path: "/admin/dashboard/minutes", label: "Minutes" },
];

const Navigation = () => {
  const { loginState, setLoginState } = useContext(LoginContext);

  const logOut = () => {
    setLoginState(false);
  };

  const [navLinks, setNavLinks] = useState([]);

  useEffect(() => {
    if (loginState) {
      setNavLinks(adminLinks);
    } else {
      setNavLinks(mainLinks);
    }
  }, [loginState]);


  return (
    <Navbar expand="lg" className="navigation fixed-top drop-shadow-xl py-3">
      <Container>
        <Navbar.Brand href="#home" className="mr-8"
          style={{ position: 'relative', width: '6rem' }}
        >
          <img src={logo} alt="logo" style={{ 
            height: '6rem',
            width: '6rem',
            position: 'absolute',
            top: '0%',
            left: '50%',
            marginLeft: '-5rem',
            marginTop: '-1.5rem',
            borderRadius: '15px'
          }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-right">
          <Nav className="flex gap-4">
            {navLinks.map((link, index) => (
              <Nav.Link key={index} href={link.path}>
                <NavLink to={link.path}>{link.label}</NavLink>
              </Nav.Link>
            ))}
            {loginState && (
              <Nav.Link href="#home">
                <NavLink className="text-themeDark hover:text-themePrimary" onClick={logOut} to="/Admin">Log Out</NavLink>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;