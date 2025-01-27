import React from "react";
import { NavLink } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/images/logo.png';
import LoginContext from "../LoginContext";


const Navigation = () => {

  const { loginState, setLoginState } = useContext(LoginContext);

  const logOut = () => {
    
    setLoginState(false);
  };

  return (
    // <div>
    //   <nav className="flex navbar">
    //     <div className="navbar__logo">
    //       <img src="/assets/media/logo.png" alt="logo" />
    //     </div>
    //     <ul className="flex">
    //       <li>
    //         <NavLink to="/">Home</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/articles">Articles</NavLink>
    //       </li>
    //       <li>
    //         <NavLink to="/committee">Committee</NavLink>
    //       </li>
    //     </ul>
    //   </nav>
    // </div>


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
          }} /> {/* Use the image */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-right">
          <Nav className="flex gap-4">
            <Nav.Link href="#home">
              <NavLink cla to="/">Home</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/events">Events</NavLink>
            </Nav.Link>
            <Nav.Link href="">
              <NavLink to="/articles">Articles</NavLink>
            </Nav.Link>
            <Nav.Link href="#home">
              <NavLink to="/committee">Committee</NavLink>
            </Nav.Link>
            <Nav.Link href="#home">
              <NavLink to="/about">About us</NavLink>
            </Nav.Link>
            { loginState && (<Nav.Link href="#home">
                <NavLink className="text-themeDark hover:text-themePrimary" onClick={() => logOut()} to="/Admin">Log Out</NavLink>
              </Nav.Link>)
            }
            {/* <Nav.Link href="#home">
              <NavLink to="/committee">Contact us</NavLink>
            </Nav.Link> */}
            {/* <Nav.Link href="#home">
              <NavLink to="/admin">Login</NavLink>
            </Nav.Link> */}
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Navigation;