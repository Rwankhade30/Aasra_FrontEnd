import React from "react";
import { Link } from "react-router-dom";
import FeaturedAnimals from "../components/home/FeaturedAnimals";
import MissionSection from "../components/home/MissionSection";
import OurImpactSection from "../components/home/OurImpactSection";


function Home() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(to right, #f1f9f8, #f5f4fa)",
          position: "relative",
        }}
      >
        {/* Optional Background Pattern */}
        <div
          className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
          style={{
            pointerEvents: "none",
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M26.5 20.45c-.79.32-1.73-.18-2.1-1.09-.37-.91-.04-1.9.75-2.21.79-.31 1.73.18 2.1 1.09.36.91.03 1.9-.75 2.21z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: "cover",
          }}
        />

        <div className="container position-relative py-5">
          <div className="row align-items-center">
            {/* Left Text */}
            <div className="col-md-6 text-center text-md-start">
              <h1 className="fw-bold mb-3">
                <span className="text-teal d-block fs-2">Find a Forever Friend</span>
                <span className="text-dark display-5">Save a Life Today</span>
              </h1>
              <p className="lead text-muted">
                Join our mission to rescue, rehabilitate, and rehome animals in need.
                Whether you want to adopt, volunteer, or donate — you can make a difference.
              </p>
              <div className="mt-4 d-flex flex-wrap gap-3 justify-content-center justify-content-md-start">
                <Link to="/adoptions" className="btn btn-outline-teal btn-lg">
                  <i className="bi bi-heart me-2"></i> Adopt Now
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="col-md-6 text-center mt-4 mt-md-0">
              <img
                src="https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Hero"
                className="img-fluid rounded-4 shadow"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>

        {/* Action Boxes */}
        <div className="container border-top mt-5 pt-5">
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <Link to="/adoptions" className="text-decoration-none text-dark d-block hover-teal">
                <i className="bi bi-heart fs-2 text-orange mb-2"></i>
                <h5 className="fw-semibold">Adopt</h5>
                <p className="text-muted small">Find your perfect companion</p>
              </Link>
            </div>
            <div className="col-md-3 mb-4">
              <Link to="/rescues" className="text-decoration-none text-dark d-block hover-teal">
                <i className="bi bi-shield-check fs-2 text-teal mb-2"></i>
                <h5 className="fw-semibold">Rescue</h5>
                <p className="text-muted small">Help animals in need</p>
              </Link>
            </div>
            <div className="col-md-3 mb-4">
              <Link to="/volunteer" className="text-decoration-none text-dark d-block hover-teal">
                <i className="bi bi-people fs-2 text-purple mb-2"></i>
                <h5 className="fw-semibold">Volunteer</h5>
                <p className="text-muted small">Join our community</p>
              </Link>
            </div>
            <div className="col-md-3 mb-4">
              <Link to="/donate" className="text-decoration-none text-dark d-block hover-teal">
                <i className="bi bi-currency-dollar fs-2 text-success mb-2"></i>
                <h5 className="fw-semibold">Donate</h5>
                <p className="text-muted small">Support our mission</p>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 🔽 Only on Home Page */}
      <FeaturedAnimals />
      <MissionSection />
      <OurImpactSection />
    </>
  );
}

export default Home;
