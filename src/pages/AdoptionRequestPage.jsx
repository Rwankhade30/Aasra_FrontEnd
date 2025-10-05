// pages/AdoptionRequestPage.jsx
import React from "react";
import { useParams } from "react-router-dom";
import AdoptionForm from "../components/AdoptionForm";

const AdoptionRequestPage = () => {
  const { id } = useParams();

  const handleSubmit = (formData) => {
    console.log("Form submitted for animal ID:", id);
    console.log("Form data:", formData);
    // submit to backend here
  };

  // Pass nothing (or null) so the form is blank & user-typed
  return <AdoptionForm currentUser={null} onSubmit={handleSubmit} />;
};

export default AdoptionRequestPage;
