import React from 'react';
import { useParams } from 'react-router-dom';
import AdoptionForm from '../components/AdoptionForm';

// You can replace this mock later with real user data from API or context
const mockCurrentUser = {
  full_name: "Prathamesh Gatfane",
  email: "prathamesh@example.com",
  phone_number: "+91 9876543210",
  address: "123, Pune, Maharashtra"
};

const AdoptionRequestPage = () => {
  const { id } = useParams();

  const handleSubmit = (formData) => {
    console.log("Form submitted for animal ID:", id);
    console.log("Form data:", formData);
    // You can use fetch/axios here to submit to backend
  };

  return <AdoptionForm currentUser={mockCurrentUser} onSubmit={handleSubmit} />;
};

export default AdoptionRequestPage;
