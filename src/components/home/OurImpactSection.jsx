import React from 'react';

const OurImpactSection = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="bg-white rounded-4 shadow overflow-hidden">
          <div className="row g-0">
            {/* Left Side: Text & Stats */}
            <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
              <h2 className="fw-bold mb-3">Our Impact</h2>
              <p className="text-muted mb-4">
                Since our founding, we've helped thousands of animals find their forever homes and
                provided support to countless more through our community programs.
              </p>

              <div className="row row-cols-2 g-4">
                <div>
                  <p className="fs-2 fw-bold text-info">5,000+</p>
                  <p className="text-muted small">Animals Rescued</p>
                </div>
                <div>
                  <p className="fs-2 fw-bold text-warning">4,500+</p>
                  <p className="text-muted small">Adoptions</p>
                </div>
                <div>
                  <p className="fs-2 fw-bold text-purple">1,200+</p>
                  <p className="text-muted small">Volunteers</p>
                </div>
                <div>
                  <p className="fs-2 fw-bold text-success">10+</p>
                  <p className="text-muted small">Partner Shelters</p>
                </div>
              </div>
            </div>

            {/* Right Side: Image */}
            <div className="col-md-6 d-none d-md-block">
              <img
                src="/images/impact.jpg"
                alt="Our Impact"
                className="img-fluid h-100 w-100 object-fit-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurImpactSection;
