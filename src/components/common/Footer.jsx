import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-light border-top pt-5 pb-4 text-muted text-sm">
      <div className="container">
        <div className="row gy-4">

          {/* Logo & Description */}
          <div className="col-md-3">
            <div className="d-flex align-items-center mb-3">
              <img
                src="/assets/aasra_logo.jpg"
                alt="AASRA Logo"
                className="rounded-circle me-2"
                width="40"
                height="40"
              />
              <span className="fs-5 fw-bold text-dark">AASRA</span>
            </div>
            <p>Connecting animals in need with loving forever homes since 2025.</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" aria-label="Facebook"><i className="bi bi-facebook fs-5 text-secondary hover-teal"></i></a>
              <a href="#" aria-label="Twitter"><i className="bi bi-twitter fs-5 text-secondary hover-teal"></i></a>
              <a href="#" aria-label="Instagram"><i className="bi bi-instagram fs-5 text-secondary hover-teal"></i></a>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-md-3">
            <h6 className="text-dark fw-semibold mb-3 text-uppercase">Navigation</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-muted text-decoration-none hover-teal">Home</Link></li>
              <li><Link to="/adoptions" className="text-muted text-decoration-none hover-teal">Adopt</Link></li>
              <li><Link to="/rescues" className="text-muted text-decoration-none hover-teal">Rescue</Link></li>
              <li><Link to="/shelters" className="text-muted text-decoration-none hover-teal">Shelters</Link></li>
              <li><Link to="/donate" className="text-muted text-decoration-none hover-teal">Donate</Link></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div className="col-md-3">
            <h6 className="text-dark fw-semibold mb-3 text-uppercase">Get Involved</h6>
            <ul className="list-unstyled">
              <li><Link to="/volunteers" className="text-muted text-decoration-none hover-teal">Volunteers</Link></li>
              <li><Link to="/fosters" className="text-muted text-decoration-none hover-teal">Foster</Link></li>
              <li><Link to="/events" className="text-muted text-decoration-none hover-teal">Events</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h6 className="text-dark fw-semibold mb-3 text-uppercase">Contact Us</h6>
            <ul className="list-unstyled">
              <li><i className="bi bi-telephone me-2"></i>(555) 123-4567</li>
              <li><i className="bi bi-envelope me-2"></i>info@aasrarescueandadoptions.com</li>
              <li>
                <i className="bi bi-geo-alt me-2"></i>
                123 Rescue Lane<br />
                Animal City, AC 12345
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top mt-4 pt-3 text-center">
          <p className="mb-1">&copy; {new Date().getFullYear()} AASRA. All rights reserved.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/privacy" className="text-muted text-decoration-none hover-teal">Privacy Policy</Link>
            <Link to="/terms" className="text-muted text-decoration-none hover-teal">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
