// src/components/adoption/AdoptionForm.jsx
import React, { useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useUser } from "../../context/UserContext";
import { useLocation } from "react-router-dom";

const AdoptionForm = ({ onSubmitSuccess }) => {
  // ⬇️ expects your UserContext to provide { user, updateUser }
  const { user, updateUser } = useUser();
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
  const [submittedData, setSubmittedData] = useState(null);

  // Prefill form from context (and keep it in sync if context changes)
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the user-identifying fields into global context so they change per user
    updateUser({
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim(),
      address: formData.address.trim(),
    });

    const newSubmission = {
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      phone_number: formData.phone_number.trim(),
      address: formData.address.trim(),
      reason: formData.reason.trim(),
      animal: { name: animalName },
      created_at: new Date(),
    };

    // TODO: POST newSubmission to your API here if needed
    // await api.submitAdoptionRequest(newSubmission);

    setSubmittedData(newSubmission);
    setShowSuccess(true);
    if (onSubmitSuccess) onSubmitSuccess();

    // Clear only the reason field so user data remains
    setFormData((prev) => ({ ...prev, reason: "" }));
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

        {/* If you want to hide the form after submission, wrap this in: {!submittedData && (...) } */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
              placeholder="Your full name"
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
              placeholder="you@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              placeholder="1234567890"
              pattern="[0-9+\-\s()]{7,}" // simple client-side validation
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
              placeholder="City, Country"
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

      {/* ✅ Submission summary (shown after submit) */}
      {submittedData && (
        <Card className="mx-auto p-4 shadow mt-4" style={{ maxWidth: "600px" }}>
          <h5 className="mb-3 text-center text-success">🎉 Adoption Request Submitted</h5>
          <p className="text-center text-muted mb-3">Here are your submitted details:</p>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Full Name:</strong> {submittedData.full_name}
            </li>
            <li className="list-group-item">
              <strong>Email:</strong> {submittedData.email}
            </li>
            <li className="list-group-item">
              <strong>Phone:</strong> {submittedData.phone_number}
            </li>
            <li className="list-group-item">
              <strong>Address:</strong> {submittedData.address}
            </li>
            <li className="list-group-item">
              <strong>Reason to Adopt:</strong> {submittedData.reason}
            </li>
            {submittedData.animal?.name && (
              <li className="list-group-item">
                <strong>Animal:</strong> {submittedData.animal.name}
              </li>
            )}
            {submittedData.created_at && (
              <li className="list-group-item">
                <strong>Submitted:</strong>{" "}
                {new Date(submittedData.created_at).toLocaleDateString()}
              </li>
            )}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default AdoptionForm;
