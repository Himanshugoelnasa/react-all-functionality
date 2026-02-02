import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "john@mail.com",
    password: "changeme",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1️⃣ Login
      const res = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error("Invalid email or password");

      const data = await res.json();

      // 2️⃣ Fetch profile (GET)
      const profileRes = await fetch(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        }
      );

      if (!profileRes.ok) throw new Error("Failed to fetch profile");

      const user = await profileRes.json();

      // 3️⃣ Store in Redux
      dispatch(
        setAuth({
          user,
          token: data.access_token,
        })
      );

      // 4️⃣ Optional persistence
      sessionStorage.setItem("token", data.access_token);

      // 5️⃣ Redirect
      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="auth-wrapper">
      <Card className="auth-card">
        <h3 className="auth-title text-center">Welcome Back</h3>
        <p className="auth-subtitle text-center">
          Login to your account
        </p>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100 btn-auth">
            Login
          </Button>
        </Form>

        <div className="auth-footer">
          Don’t have an account? <Link to="/register">Register</Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
