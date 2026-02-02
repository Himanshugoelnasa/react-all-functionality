import React from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import "./auth.css";
import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API c
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-card">
        <h3 className="auth-title text-center">Create Account</h3>
        <p className="auth-subtitle text-center">
          Sign up to get started
        </p>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control placeholder="John" required />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control placeholder="Doe" required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="john@example.com" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Create password" required />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="w-100 btn-auth"
          >
            Register
          </Button>
        </Form>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
