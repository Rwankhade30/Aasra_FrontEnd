// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- ensure this exact import path
import "./Register.css";

export default function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth(); // use context login + loading
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [globalError, setGlobalError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!identifier.trim()) errs.identifier = "Username or email is required";
    if (!password) errs.password = "Password is required";
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setGlobalError(null);

    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    try {
      // Build creds for context.login (supports username OR email)
      const creds = identifier.includes("@")
        ? { email: identifier.trim(), password }
        : { username: identifier.trim(), password };

      await login(creds);           // <-- IMPORTANT: await so Navbar sees state
      navigate("/rescues");       // redirect after successful login
    } catch (err) {
      // If your context throws on non-2xx, you'll land here
      setGlobalError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reg-page">
      <div className="reg-card">
        <h1 className="reg-title login-title">Welcome Back</h1>

        {globalError && <div className="reg-alert">{globalError}</div>}

        <form className="reg-form" onSubmit={onSubmit} noValidate>
          <div className="reg-row">
            <div className="reg-field" style={{ flex: "1 1 100%" }}>
              <label>
                Username or Email <span className="required">*</span>
              </label>
              <input
                name="identifier"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  setFieldErrors((p) => ({ ...p, identifier: null }));
                  setGlobalError(null);
                }}
                className={fieldErrors.identifier ? "input error" : "input"}
                placeholder="username or email"
                autoFocus
              />
              {fieldErrors.identifier && (
                <div className="field-error">{fieldErrors.identifier}</div>
              )}
            </div>
          </div>

          <div className="reg-row">
            <div className="reg-field" style={{ flex: "1 1 100%" }}>
              <label>
                Password <span className="required">*</span>
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((p) => ({ ...p, password: null }));
                  setGlobalError(null);
                }}
                className={fieldErrors.password ? "input error" : "input"}
                placeholder="••••••••"
              />
              {fieldErrors.password && (
                <div className="field-error">{fieldErrors.password}</div>
              )}
            </div>
          </div>

          <div className="text-right" style={{ marginTop: "-6px", marginBottom: "10px" }}>
            <Link to="/forgot-password" className="link" style={{ color: "green" }}>
              Forgot password?
            </Link>
          </div>

          <div className="reg-actions">
            <button
              type="submit"
              className="btn-submit login-btn"
              disabled={submitting || loading}  // also disable while context is working
            >
              {submitting || loading ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="reg-footer login-footer">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="link">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
