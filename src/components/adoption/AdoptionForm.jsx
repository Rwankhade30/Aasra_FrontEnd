// src/components/adoption/AdoptionForm.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import AdoptionRequests from "./AdoptionRequests"; // ✅ import the reusable component

const AdoptionForm = ({ onSubmitSuccess }) => {
  const user = useUser();
  const location = useLocation();

  const animalName = location.state?.animalName || "Unknown";

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    reason: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        full_name: user.full_name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRequest = {
      id: Date.now(),
      animal: { name: animalName },
      housing_type: "Apartment",
      have_pets: true,
      experience: formData.reason,
      preferred_pet: animalName,
      status: "Requested",
      created_at: new Date(),
    };

    setAdoptionRequests((prev) => [newRequest, ...prev]);
    setShowSuccess(true);

    if (onSubmitSuccess) {
      onSubmitSuccess();
    }

    setFormData((prev) => ({
      ...prev,
      reason: "",
    }));
  };

  return (
    <div className="container my-5">
      <Card className="mx-auto p-4 shadow" style={{ maxWidth: "600px" }}>
        <h4 className="mb-4 text-center text-primary">Adopt {animalName}</h4>

        {showSuccess && (
          <Alert variant="success" className="text-center">
            ✅ Adoption request for <strong>{animalName}</strong> has been submitted!
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              as="textarea"
              name="address"
              rows={2}
              value={formData.address}
              onChange={handleChange}
              required
              disabled
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Why do you want to adopt {animalName}?</Form.Label>
            <Form.Control
              as="textarea"
              name="reason"
              rows={3}
              value={formData.reason}
              onChange={handleChange}
              required
              placeholder={`Explain why you're interested in adopting ${animalName}`}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Submit Adoption Request
          </Button>
        </Form>
      </Card>

      {/* ✅ Use shared AdoptionRequests component */}
      {adoptionRequests.length > 0 && (
        <div className="mt-4">
          <h5 className="mb-3">📋 My Adoption Requests</h5>
          <AdoptionRequests requests={adoptionRequests} setRequests={setAdoptionRequests} />
        </div>
      )}
    </div>
  );
};

export default AdoptionForm;
