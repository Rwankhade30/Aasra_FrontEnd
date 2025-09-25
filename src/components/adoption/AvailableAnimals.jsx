import React from 'react';
import FeaturedAnimalCard from '../../pages/FeaturedAnimalCard';

const AvailableAnimals = ({ animals = [] }) => {
  if (!animals.length) {
    return (
      <p className="text-center text-muted">
        No animals available for adoption at the moment.
      </p>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {animals.map((animal) => (
        <FeaturedAnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
};

export default AvailableAnimals;
