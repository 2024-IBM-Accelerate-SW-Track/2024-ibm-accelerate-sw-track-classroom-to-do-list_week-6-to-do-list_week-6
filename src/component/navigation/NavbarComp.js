import React, { Component } from "react";
<<<<<<< HEAD
import {Navbar, Nav, Container} from 'react-bootstrap'
=======
import {Navbar, Nav, NavDropdown, Container} from 'react-bootstrap'
>>>>>>> week4/main

import {
    BrowserRouter as Router,
    Routes,
    Route, 
    Link
} from "react-router-dom"
import About from "../../pages/About";
import Home from "../../pages/Home";
<<<<<<< HEAD
import TodoListAll from "../../pages/TodoListAll";
import SearchPage from "../../pages/SearchPage";
=======
>>>>>>> week4/main

export default class NavbarComp extends Component {
    render() {
        return (
            <Router>
            <div>
            <Navbar bg="dark" variant={"dark"} expand="lg">
                <Container>
                    {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={"/"}> Home </Nav.Link>
                        <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
<<<<<<< HEAD
                        <Nav.Link as={Link} to={"/TodoListAll"}>TodoPage</Nav.Link>
                        <Nav.Link as={Link} to={"/SearchPage"}>SearchPage</Nav.Link>
=======
>>>>>>> week4/main
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </div>
            <div>
                <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/about" element={<About/>}/>
<<<<<<< HEAD
                <Route exact path="/TodoListAll" element={<TodoListAll/>}/>
                <Route exact path="/SearchPage" element={<SearchPage/>}/>
=======
>>>>>>> week4/main
                </Routes>
            </div>
            </Router>
        )
    }
}