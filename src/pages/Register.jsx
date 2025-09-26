// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFieldErrors((p) => ({ ...p, [e.target.name]: null }));
    setGlobalError(null);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!form.contact.trim()) errs.contact = "Contact number is required";
    if (!form.address.trim()) errs.address = "Address is required";
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setSubmitting(true);
    setGlobalError(null);

    try {
      const base = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await fetch(`${base}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          contact: form.contact,
          address: form.address,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setGlobalError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reg-page">
      <div className="reg-card">
        <h1 className="reg-title">Create an Account</h1>

        {globalError && <div className="reg-alert">{globalError}</div>}

        <form className="reg-form-vertical" onSubmit={onSubmit} noValidate>
          <div className="field-block">
            <label>Full Name <span className="required">*</span></label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className={fieldErrors.name ? "input error" : "input"}
              placeholder="John Doe"
            />
            {fieldErrors.name && <div className="field-error">{fieldErrors.name}</div>}
          </div>

          <div className="field-block">
            <label>Email Address <span className="required">*</span></label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className={fieldErrors.email ? "input error" : "input"}
              placeholder="you@example.com"
            />
            {fieldErrors.email && <div className="field-error">{fieldErrors.email}</div>}
          </div>

          <div className="field-block">
            <label>Password <span className="required">*</span></label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              className={fieldErrors.password ? "input error" : "input"}
              placeholder="••••••••"
            />
            {fieldErrors.password && <div className="field-error">{fieldErrors.password}</div>}
          </div>

          <div className="field-block">
            <label>Confirm Password <span className="required">*</span></label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={onChange}
              className={fieldErrors.confirmPassword ? "input error" : "input"}
              placeholder="••••••••"
            />
            {fieldErrors.confirmPassword && <div className="field-error">{fieldErrors.confirmPassword}</div>}
          </div>

          <div className="field-block">
            <label>Contact Number <span className="required">*</span></label>
            <input
              name="contact"
              value={form.contact}
              onChange={onChange}
              className={fieldErrors.contact ? "input error" : "input"}
              placeholder="+91 9876543210"
            />
            {fieldErrors.contact && <div className="field-error">{fieldErrors.contact}</div>}
          </div>

          <div className="field-block">
            <label>Address <span className="required">*</span></label>
            <input
              name="address"
              value={form.address}
              onChange={onChange}
              className={fieldErrors.address ? "input error" : "input"}
              placeholder="123 Street, City, Country"
            />
            {fieldErrors.address && <div className="field-error">{fieldErrors.address}</div>}
          </div>

          <div className="reg-actions">
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="reg-footer">
          <p>
            Already have an account? <Link to="/login" className="link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
