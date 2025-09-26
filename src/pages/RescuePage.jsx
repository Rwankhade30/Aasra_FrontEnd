// src/pages/RescuePage.jsx
import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RescuePage = () => {
  const [rescues, setRescues] = useState([]);

  // Simulate fetching rescues (replace this with your API call later)
  useEffect(() => {
    const mockRescues = [
      {
        id: 1,
        category: "Dog",
        breed: "Labrador",
        description: "Found injured near the highway.",
        status: "Under Treatment",
        age: "2 years",
        size: "Medium",
        location: "Pune",
      },
      {
        id: 2,
        category: "Cat",
        breed: "Siamese",
        description: "Rescued from a construction site.",
        status: "Recovered",
        age: "1 year",
        size: "Small",
        location: "Mumbai",
      },
    ];
    setRescues(mockRescues);
  }, []);

  return (
    <div>

      {/* Hero Header */}
      <header className="bg-warning-subtle py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-5 fw-bold mb-3">Rescue Services</h1>
              <p className="lead mb-4">
                We provide professional animal rescue services for pets in distress.
                Report animals in need, and our team will respond promptly to ensure their safety.
              </p>
              <Link to="/rescues/new" className="btn btn-outline-warning">
                Report an Animal
              </Link>

            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <img
                src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Animal rescue"
                className="img-fluid rounded-3 shadow"
              />
            </Col>
          </Row>
        </Container>
      </header>

      {/* Add New Rescue */}
      <div className="text-center mt-4">
            <Link to="/rescues/new" className="btn btn-primary">
                Recent Animal Reports
            </Link>      
        </div>

      {/* Rescue Stories */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5">Rescue Stories</h2>
          <Row className="g-4">
            {rescues.map((r) => (
              <Col md={6} key={r.id}>
                <Card className="h-100 border-0 shadow-sm">
                  <Row className="g-0">
                    <Col md={5}>
                      <img
                        src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80"
                        className="img-fluid rounded-start h-100"
                        alt="Rescued animal"
                        style={{ objectFit: "cover" }}
                      />
                    </Col>
                    <Col md={7}>
                      <Card.Body>
                        <Card.Title>
                          {r.category} {r.breed}
                        </Card.Title>
                        <Card.Text>{r.description}</Card.Text>
                        <Card.Text className="text-primary">{r.status}</Card.Text>
                        <Card.Text>
                          <small className="text-muted">{r.age} • {r.size}</small>
                        </Card.Text>
                        <span className="badge bg-success-subtle text-success">{r.location}</span>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>

          <div className="text-center mt-4">
            <Link to="/success-stories" className="btn btn-outline-info">View More Success Stories</Link>
          </div>
        </Container>
      </section>

      {/* Rescue Services */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5">Rescue Services</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm p-4">
                <div className="bg-info-subtle p-3 rounded-circle mx-auto mb-3" style={{ width: 80, height: 80 }}>
                  <i className="bi bi-telephone-fill text-info fs-1"></i>
                </div>
                <Card.Body>
                  <Card.Title>Emergency Response</Card.Title>
                  <Card.Text>24/7 team ready to rescue animals in danger.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm p-4">
                <div className="bg-warning-subtle p-3 rounded-circle mx-auto mb-3" style={{ width: 80, height: 80 }}>
                  <i className="bi bi-heart-pulse-fill text-warning fs-1"></i>
                </div>
                <Card.Body>
                  <Card.Title>Medical Care</Card.Title>
                  <Card.Text>Vet care and rehab for rescued animals.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm p-4">
                <div className="bg-purple-subtle p-3 rounded-circle mx-auto mb-3" style={{ width: 80, height: 80 }}>
                  <i className="bi bi-house-heart-fill text-purple fs-1"></i>
                </div>
                <Card.Body>
                  <Card.Title>Rehabilitation</Card.Title>
                  <Card.Text>Help animals recover and prepare for adoption.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  );
};

export default RescuePage;
