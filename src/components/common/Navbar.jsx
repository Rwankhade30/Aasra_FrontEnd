// Navbar.jsx
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, ready } = useAuth();
  const navigate = useNavigate();

  const isAuthed = ready && !!user;

  const handleLogout = async () => {
    await logout();
    navigate('/'); // optional redirect
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm sticky-top py-2">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <i className="bi bi-shield-check text-primary fs-4"></i>
          <span className="animated-logo-text fw-bold text-uppercase">AASRA</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainMenu"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="mainMenu" className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          {/* Nav Links */}
          <ul className="navbar-nav ms-auto mb-2 mb-md-0 me-md-3">
            {ready && isAuthed ? (
              <>
                <li className="nav-item">
                  <NavLink end to="/" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    <i className="bi bi-house me-1"></i>Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/adoptions" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    <i className="bi bi-heart me-1"></i>Adopt
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/rescues" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    <i className="bi bi-shield-check me-1"></i>Rescue
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/shelters" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    <i className="bi bi-people me-1"></i>Shelters
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/donate" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    <i className="bi bi-currency-dollar me-1"></i>Donate
                  </NavLink>
                </li>
              </>
            ) : (
              // Not authed: ONLY Rescue visible
              <>
                <li className="nav-item">
                  <NavLink to="/rescues" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    <i className="bi bi-shield-check me-1"></i>Rescue
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Auth area */}
          <div className="d-flex gap-2 ms-auto mt-2 mt-md-0">
            {!ready ? null : isAuthed ? (
              <div className="dropdown">
                <button className="btn btn-outline-primary btn-sm dropdown-toggle px-3" data-bs-toggle="dropdown" type="button">
                  <i className="bi bi-person-circle me-1"></i>My Profile
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      <i className="bi bi-person me-2"></i>View Profile
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Log out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-primary btn-sm px-3">Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm px-3 text-white">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
