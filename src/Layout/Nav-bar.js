import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from "react-redux";
import OpenInNewTab from '../components/OpenInNewTab'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/userSlice"; // ✅ IMPORTANT
import { broadcastLogout } from "../utils/authBroadcast";
import { useSocket } from "../socket/socketProvider";

const NavbarMenu = () => {
    const socket = useSocket();

    const [isConnected, setIsConnected] = useState(socket.connected);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };

    }, [socket]);

    const userId = useSelector(state => state.auth.user?.id);

    const handleLogout = () => {
        if (userId) {
            broadcastLogout(userId); // 🔥 scoped logout
        }
        dispatch(logout());
        sessionStorage.clear();
        navigate("/login");
    };

    const userName = useSelector(state => state.auth.user.name);
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/dashboard" className="text-5xl font-bold">
                        Dashboard
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav">
                        {/* LEFT NAV */}
                        <Nav className="me-auto">
                            
                            <Nav.Link  as={Link} to="/dashboard/product-details">
                                {/* <OpenInNewTab to="/dashboard/products">
                                    Products (New Tab)
                                </OpenInNewTab> */}
                                Product Details
                            </Nav.Link>
                            
                            <Nav.Link as={Link} to="/dashboard/file-upload">
                                File Upload
                            </Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/export" className="font-bold">
                                Export Data
                            </Nav.Link>
                            <Nav.Link as={Link} to="/chats" className="font-bold">
                                Chats
                            </Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/tracking" className="font-bold">
                                Tracking
                            </Nav.Link>
                            <Nav.Link as={Link} to="/dashboard/payment" className="font-bold">
                                Payment
                            </Nav.Link>
                        </Nav>

                        <Nav className="">
                            <span className='nav-link'>
                                {isConnected ? "🟢 Online" : "🔴 Offline"} &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                            </span>
                        </Nav>

                        {/* RIGHT NAV */}
                        <Nav>
                            <NavDropdown title={userName} id="collapsible-nav-dropdown">
                                <NavDropdown.Item
                                    as={Link}
                                    to="/dashboard/profile"
                                >
                                    Profile
                                </NavDropdown.Item>

                                <NavDropdown.Item
                                    as={Link}
                                    to="/dashboard/settings"
                                >
                                    Settings
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                {/* 🔥 FIX: Proper logout handler */}
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    )
}

export default NavbarMenu
