import React from 'react';

const AdoptionProcessSteps = () => {
  const steps = [
    {
      number: 1,
      title: "Browse Available Pets",
      description: "Look through our available animals to find your perfect match."
    },
    {
      number: 2,
      title: "Submit Application",
      description: "Fill out our adoption application form with your information."
    },
    {
      number: 3,
      title: "Meet & Greet",
      description: "Schedule a visit to meet your potential new family member."
    },
    {
      number: 4,
      title: "Take Home",
      description: "Complete the adoption process and welcome your pet home!"
    }
  ];

  return (
    <div className="row justify-content-center g-4">
      {steps.map((step) => (
        <div className="col-md-6 col-lg-3" key={step.number}>
          <div className="card text-center p-4 shadow-sm h-100">
            <div className="display-6 fw-bold text-teal mb-2">{step.number}</div>
            <h5 className="fw-semibold mb-2">{step.title}</h5>
            <p className="text-muted small mb-0">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdoptionProcessSteps;
