"use client";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const SubscriptionForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    email: "",
    phone_number: "",
  });

  const [file, setFile] = useState<any>([]);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare form data for submission
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("username", formData.username);
    formDataObj.append("email", formData.email);
    formDataObj.append("phone_number", formData.phone_number);
    if (file) {
      formDataObj.append("file", file);
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/admin/subscription/payment`, formDataObj, );

      if (response.status === 200) {
        toast.success("Subscription successful!", {
          position: "top-center",
        });
        // Optionally reset the form after successful submission
        setFormData({
          title: "",
          username: "",
          email: "",
          phone_number: "",
        });
        setFile(null);
        handleClose();
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      {/* Subscribe Button */}
      <Button variant="danger" onClick={handleShow}>
        Subscribe
      </Button>

      {/* Modal for Subscription Form */}
      <Modal size="lg" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Subscription Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <Row className="mb-3">
                  <Col xs={3}>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Title</Form.Label>
                      <Form.Select
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select...</option>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Dr">Dr</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col xs={9}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mt-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mt-3">
                  <Form.Label>
                    Upload your payment proof (screenshot or PDF)
                  </Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="submit-button mt-3"
                >
                  Submit
                </Button>
              </div>
              <div className="col-md-6">
                <div className="payment-info">
                  <h6>Subscribe using any of the payment methods below:</h6>
                  <p>
                    Account Name:{" "}
                    <span className="text-primary">RACE EDITORIALE LLP</span>
                  </p>
                  <p>
                    Account Number:{" "}
                    <span className="text-primary">218505001886</span>
                  </p>
                  <p>
                    IFSC: <span className="text-primary">ICIC0002185</span>
                  </p>
                  <p>
                    Branch Name:{" "}
                    <span className="text-primary">Saidapet Branch</span>
                  </p>
                </div>
                <hr />
                <div className="payment-info">
                  <p>
                    UPI ID:{" "}
                    <span className="text-primary">
                      raceeditorialellp.9840490241.ibz@icici
                    </span>
                  </p>
                </div>
                <hr />

                <div className="d-flex justify-content-center">
                  <Image
                    src="/images/upi scanner-uuIYAzO1.png"
                    alt="upi scanner"
                    width={120}
                    height={120}
                  />
                </div>
              </div>
            </div>
          </Form>
          <hr />
          <p className="text-center m-0">
            NOTE:{" "}
            <span className="text-warning">
              Exclusive new article - content should be provided by you before
              the 20th of every month. Our team will ensure its publishing on
              the website and magazine on priority.
            </span>
          </p>
          <p className="mt-2 m-0 text-center">
            RACE FLASH REPORT: Forecast and analytics package is additional,
            reach us for more details.
          </p>
          <p className="mt-2 m-0 text-center" style={{ fontSize: "1rem" }}>
            For <span className="text-success"><b>10-50% discounts</b></span>, call 9384857578 / 9962110101 or email
            raceautoindia@gmail.com.
          </p>
          <p className="mt-2 m-0 text-center" style={{ fontSize: "1rem" }}>
            Bronze package can be availed free in the first month on the
            confirmation of any of the premium packages
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubscriptionForm;
