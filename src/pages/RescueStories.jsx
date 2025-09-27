// src/pages/RescueList.jsx
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

const RescueList = () => {
  const [rescues, setRescues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your backend base URL (set via .env or fallback)
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/rescues`);
        setRescues(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch rescue data.");
      } finally {
        setLoading(false);
      }
    };
    fetchRescues();
  }, [API_BASE]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center py-5">
        <Spinner animation="border" variant="success" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  const placeholder =
    "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80";

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-success">Recent Animal Rescues</h2>
      <Row className="g-4">
        {rescues.map((r) => {
          // Build proper image src
          const imgSrc = r.imageUrl
            ? r.imageUrl.startsWith("http")
              ? r.imageUrl
              : `${API_BASE}${r.imageUrl}`
            : placeholder;

          return (
            <Col md={6} key={r._id}>
              <Card className="h-100 border-0 shadow-sm">
                <Row className="g-0">
                  <Col md={5}>
                    <img
                      src={imgSrc}
                      className="img-fluid rounded-start h-100"
                      alt={r.category || "Rescued animal"}
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = placeholder;
                      }}
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
                        <small className="text-muted">
                          {r.age ? `${r.age} • ` : ""} {r.size}
                        </small>
                      </Card.Text>
                      <span className="badge bg-success-subtle text-success">
                        {r.location}
                      </span>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default RescueList;
