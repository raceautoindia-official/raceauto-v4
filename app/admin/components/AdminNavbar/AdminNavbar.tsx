"use client";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

import SearchBar from "@/app/search/[title]/SearchBar";
import Link from "next/link";

const AdminNavbar = () => {
  return (
    <div className="col-12">
      <Navbar bg="white" variant="white" className="shadow-sm">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto px-5">
            <div className="d-flex">
            <SearchBar />
            <Link href="/">
              {" "}
              <Button variant="primary" className="me-5 ms-5">
                View Site
              </Button>
            </Link>
            </div>
            <NavDropdown
              title={<FaUserCircle size={20} />}
              id="basic-nav-dropdown"
              drop="down-centered"
              style={{ backgroundColor: "white" }}
            >
              <Link href="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default AdminNavbar;
