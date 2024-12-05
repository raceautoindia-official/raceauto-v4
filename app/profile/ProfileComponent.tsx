/* eslint-disable react/no-unescaped-entities */
"use client";
import { Row, Col, Card, Button, Form } from "react-bootstrap";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPen,
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

function ProfileDashboard({ token }: { token: string }) {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [aboutme, setAboutme] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");

  const decoded: any = jwtDecode(token);
  const userInfo = async () => {
    try {
      const res = await axios.get(
        `${process.env.BACKEND_URL}api/profile/${decoded.email}`
      );
      setData(res.data);
      setEmail(res.data[0].email || "");
      setName(res.data[0].username || "");
      setAboutme(res.data[0].about_me || "");
      setInstagram(res.data[0].instagram_url || "");
      setFacebook(res.data[0].facebook_url || "");
      setLinkedin(res.data[0].linkedin_url || "");
      setTwitter(res.data[0].twitter_url || "");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userInfo();
  }, []);
  return (
    <Row className="">
      {/* Subscription Card */}
      <Col md={6} className="mb-3 mb-lg-0">
        <Card className="p-3 shadow-sm rounded-3">
          <Card.Body>
            <Card.Title className="text-center">Subscription</Card.Title>
            <Card.Text className="text-center">
              Read, explore, and enjoy - without a subscription.
            </Card.Text>
            <div className="d-flex justify-content-center">
              <Button variant="outline-secondary" className="px-4">
                Free
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Plan Subscription & Validity Card */}
      <Col md={6} className="mb-3 mb-lg-0">
        <Card className="p-3 shadow-sm rounded-3">
          <Card.Body>
            <Card.Title className="text-center">
              Plan Subscription & Validity
            </Card.Title>
            <Card.Text className="text-center">
              "Stay tuned and get ready to upgrade to our new subscription
              plans."
            </Card.Text>
            <div className="d-flex justify-content-center">
              <Button variant="outline-secondary" className="px-4">
                Upgrade
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      {/* Profile Card */}
      <Col md={6} className="mb-3 mb-lg-0">
        <Card className="p-3 shadow-sm rounded-3">
          <Card.Body>
            <Card.Title className="text-center">Profile</Card.Title>
            <Form>
              <div className="d-flex align-items-center my-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  disabled
                  value={name}
                  className="me-2"
                />

                <Link href='/user/settings'><FaPen className="text-muted" style={{ cursor: "pointer" }} /></Link>
              </div>
              <div className="d-flex align-items-center my-3">
                <Form.Control
                  type="text"
                  placeholder="Email"
                  disabled
                  value={email}
                  className="me-2"
                />
                <Link href='/user/settings'><FaPen className="text-muted" style={{ cursor: "pointer" }} /></Link>
              </div>
              <div className="d-flex align-items-center my-3">
                <Form.Control
                  type="text"
                  placeholder="About Me"
                  disabled
                  value={aboutme}
                  className="me-2"
                />
                <Link href='/user/settings'><FaPen className="text-muted" style={{ cursor: "pointer" }} /></Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      {/* Social Media Card */}
      <Col md={6} className="mt-3">
        <Card className="p-3 shadow-sm rounded-3">
          <Card.Body className="">
            <Card.Title className="text-center">Social Media</Card.Title>
            <div className="d-flex flex-column align-items-center">
              <div className="d-flex align-items-center my-2">
                <FaFacebook size={24} className="me-2" />{" "}
                <Form.Control
                  type="text"
                  placeholder="Facebook URL"
                  disabled
                  value={facebook}
                  className="me-2"
                />{" "}
                <Link href='/user/settings'><FaPen className="text-muted" style={{ cursor: "pointer" }} /></Link>
              </div>
              <div className="d-flex align-items-center my-2">
                <FaInstagram size={24} className="me-2" />{" "}
                <Form.Control
                  type="text"
                  placeholder="instagram URL"
                  value={instagram}
                  disabled
                  className="me-2"
                />{" "}
                <Link href='/user/settings'><FaPen className="text-muted" style={{ cursor: "pointer" }} /></Link>
              </div>
              <div className="d-flex align-items-center my-2">
                <FaXTwitter size={24} className="me-2" />{" "}
                <Form.Control
                  type="text"
                  placeholder="Twitter URL"
                  disabled
                  value={twitter}
                  className="me-2"
                />{" "}
                <Link href='/user/settings'><FaPen className="text-muted" style={{ cursor: "pointer" }} /></Link>
              </div>
              <div className="d-flex align-items-center my-2">
                <FaLinkedin size={24} className="me-2" />{" "}
                <Form.Control
                  type="text"
                  placeholder="Linkedin URL"
                  disabled
                  value={linkedin}
                  className="me-2"
                />{" "}
                <Link href='/user/settings'><FaPen className="text-muted" style={{ cursor: "pointer" }} /></Link>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default ProfileDashboard;
