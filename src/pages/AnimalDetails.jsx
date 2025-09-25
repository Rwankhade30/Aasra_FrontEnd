import React from 'react';
import { useParams } from 'react-router-dom';

const animals = [
  {
    id: '1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '2 years',
    gender: 'Male',
    location: 'Main Shelter',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    tags: ['Friendly', 'Trained', 'Active'],
    description: 'Max is a friendly and energetic Golden Retriever who loves to play fetch and go on long walks.',
    medicalInfo: 'Vaccinations up to date, neutered, microchipped',
    behavior: 'Good with children, good with other dogs, leash trained, house trained',
    adoptionFee: '$250',
  },
  // Add more animals if needed...
];

export default function AnimalDetails() {
  const { id } = useParams();
  const animal = animals.find((a) => a.id === id);

  if (!animal) {
    return <div className="text-center text-danger mt-5">Animal not found.</div>;
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Image */}
        <div className="col-md-6">
          <div className="card shadow">
            <img
              src={animal.image}
              alt={animal.name}
              className="card-img-top"
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="col-md-6">
          <h1 className="h2 fw-bold">{animal.name}</h1>
          <p className="text-muted mb-3">{animal.breed} | {animal.species}</p>

          <div className="row row-cols-2 g-2 small text-secondary">
            <div><strong>Age:</strong> {animal.age}</div>
            <div><strong>Gender:</strong> {animal.gender}</div>
            <div><strong>Location:</strong> {animal.location}</div>
            <div><strong>Adoption Fee:</strong> {animal.adoptionFee}</div>
          </div>

          {/* Tags */}
          {animal.tags.length > 0 && (
            <div className="mt-3 d-flex flex-wrap gap-2">
              {animal.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge rounded-pill bg-info text-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="mt-4">
            <h5 className="fw-semibold mb-1">About {animal.name}</h5>
            <p className="text-secondary">{animal.description}</p>
          </div>

          {/* Details */}
          <div className="mt-3">
            <h5 className="fw-semibold mb-1">Medical Info</h5>
            <p className="text-secondary">{animal.medicalInfo}</p>
            <h5 className="fw-semibold mt-3 mb-1">Behavior & Training</h5>
            <p className="text-secondary">{animal.behavior}</p>
          </div>

          <button className="btn btn-success mt-4">
            Apply to Adopt
          </button>
        </div>
      </div>
    </div>
  );
}
