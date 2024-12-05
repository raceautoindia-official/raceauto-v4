"use client";
import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Contact_form = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.BACKEND_URL}api/contact`, {
        name,
        email,
        message,
      });

      console.log("success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="row align-items-center justify-content-center text-white p-5 g-0"
      style={{
        backgroundImage: "url('/images/contact-banner.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 728,
      }}
    >
      <div className="text-center">
        <h1>RACE EDITORIALE LLP</h1>
        <h4>we’re here for you</h4>
      </div>
      <div
        className="col-4"
        style={{ backgroundColor: "grey", borderRadius: 20, padding: 25 }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              style={{ borderColor: "#5f504d", borderRadius: "10px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              style={{ borderColor: "#5f504d", borderRadius: "10px" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formMessage" className="mb-3">
            <Form.Control
              as="textarea"
              placeholder="Enter your Message"
              style={{ borderColor: "#5f504d", borderRadius: "10px" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={7}
            />
          </Form.Group>
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              style={{
                borderRadius: "10px",
                padding: "10px 30px",
                fontWeight: "bold",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Contact_form;
