import React from 'react';

const MissionSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Our Mission</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "720px" }}>
            We are dedicated to finding loving homes for animals in need and supporting our community
            through education and outreach.
          </p>
        </div>

        <div className="row text-center g-4">
          {/* Mission Card 1 */}
          <div className="col-md-4">
            <div className="card border h-100 shadow-sm">
              <div className="card-body">
                <div
                  className="rounded-circle bg-info bg-opacity-25 d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "64px", height: "64px" }}
                ></div>
                <h5 className="fw-semibold">Compassionate Care</h5>
                <p className="text-muted small mt-2">
                  We provide shelter, medical care, and rehabilitation for animals who have been abandoned, abused, or surrendered.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Card 2 */}
          <div className="col-md-4">
            <div className="card border h-100 shadow-sm">
              <div className="card-body">
                <div
                  className="rounded-circle bg-warning bg-opacity-25 d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "64px", height: "64px" }}
                ></div>
                <h5 className="fw-semibold">Responsible Adoption</h5>
                <p className="text-muted small mt-2">
                  Our thorough adoption process ensures animals are matched with families who can provide lifelong care and love.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Card 3 */}
          <div className="col-md-4">
            <div className="card border h-100 shadow-sm">
              <div className="card-body">
                <div
                  className="rounded-circle bg-secondary bg-opacity-25 d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "64px", height: "64px" }}
                ></div>
                <h5 className="fw-semibold">Community Education</h5>
                <p className="text-muted small mt-2">
                  We educate the public about animal welfare, responsible pet ownership, and the importance of spaying and neutering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
