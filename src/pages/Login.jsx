// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css"; // reuse the same CSS

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState(""); // username or email
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
      const payload = identifier.includes("@")
        ? { email: identifier.trim(), password }
        : { username: identifier.trim(), password };

      const base = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await fetch(`${base}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      setGlobalError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="reg-page">
      <div className="reg-card">
        {/*  title (login-title class) */}
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

          {/* Forgot password link */}
          <div className="text-right" style={{ marginTop: "-6px", marginBottom: "10px" }}>
            <Link to="/forgot-password" className="link" style={{ color: "green" }}>
              Forgot password?
            </Link>
          </div>

          <div className="reg-actions">
            {/* Blue login button (login-btn class) */}
            <button
              type="submit"
              className="btn-submit login-btn"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Footer link styled blue */}
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
