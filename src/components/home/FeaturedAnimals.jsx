
// src/components/FeaturedAnimals.jsx
import React from "react";
import { Link } from "react-router-dom";

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
    tags: ['Friendly', 'Trained', 'Active']
  },
  {
    id: '2',
    name: 'Whiskers',
    species: 'Cat',
    breed: 'Tabby',
    age: '1 year',
    gender: 'Female',
    location: 'Foster Home',
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    tags: ['Playful', 'Affectionate']
  },
  {
    id: '3',
    name: 'Bubbles',
    species: 'Rabbit',
    breed: 'Holland Lop',
    age: '6 months',
    gender: 'Female',
    location: 'Main Shelter',
    image: 'https://images.unsplash.com/photo-1535241749838-299277b6305f?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    tags: ['Calm', 'Gentle']
  },
  {
    id: '4',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Beagle Mix',
    age: '4 years',
    gender: 'Male',
    location: 'Downtown Shelter',
    image: 'https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=640&q=80',
    tags: ['Loyal', 'Energetic']
  }
];

const FeaturedAnimals = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Meet Our Animals</h2>
          <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            These adorable friends are waiting for their forever homes. Could you be their perfect match?
          </p>
        </div>

        <div className="row g-4">
          {animals.map((animal) => (
            <div key={animal.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="position-relative">
                  <img
                    src={animal.image}
                    alt={animal.name}
                    className="card-img-top"
                    style={{ height: "13rem", objectFit: "cover" }}
                  />
                  <span className="badge bg-teal position-absolute top-0 start-0 m-2">
                    {animal.species}
                  </span>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{animal.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{animal.breed}</h6>
                  <p className="card-text mb-2"><strong>Gender:</strong> {animal.gender}</p>
                  <p className="card-text mb-2"><strong>Age:</strong> {animal.age}</p>
                  <p className="card-text"><strong>Location:</strong> {animal.location}</p>

                  {animal.tags?.length > 0 && (
                    <div className="mt-2 d-flex flex-wrap gap-1">
                      {animal.tags.map((tag) => (
                        <span key={tag} className="badge bg-secondary text-light">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="card-footer bg-white border-0">
                  <Link
                    to={`/animal/${animal.id}`}
                    className="btn btn-teal w-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/adopt" className="btn btn-warning px-4 py-2">
            See All Animals →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedAnimals;
