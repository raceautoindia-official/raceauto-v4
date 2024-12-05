/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from "next/image";
import './login.css'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Validation schema for form fields
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(""); // Clear previous error messages
      await axios.post("/api/login", values);
      toast.info('Login Success!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push('/')
        router.refresh()
      }, 1000);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          setError("Account already exists.");
        } else if (error.response.status === 404) {
          setError("Account not found. Please check your credentials.");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        console.log(error)
        setError("Network error. Please check your internet connection.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col md={6} lg={3}>
          <div className="login-box p-4">
            <div className="text-center mb-4">
              <Image src="/images/black logo with text.png" alt="Logo" width={60} height={70} />
              <h2 className="mt-2">Login</h2>
            </div>
            {error && <Alert variant="danger">{error}</Alert>}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && errors.email}
                      placeholder="Enter email"
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={touched.password && errors.password}
                      placeholder="Password"
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <div className="text-end mb-3">
                    <a href="/forgot-password" className="text-muted">Forgot Password?</a>
                  </div>
                  <Button variant="primary" type="submit" className="w-100">
                    {isSubmitting ? "Logging in..." : "Login"}
                  </Button>
                  <div className="text-center mt-3">
                    <span>Don't have an account? </span><Link href="/register" className="text-primary">Signup</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
