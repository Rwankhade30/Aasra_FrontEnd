// src/pages/AdoptionsPage.jsx
import React, { useEffect, useState } from 'react';
import {
  fetchAdoptionRequests,
  fetchAnimals,
  // fetchFilters
} from '../api/adoptions';

import AdoptionRequests from '../components/adoption/AdoptionRequests';
// import AdoptionFilterForm from '../components/adoption/AdoptionFilterForm';
import AvailableAnimals from '../components/adoption/AvailableAnimals';
import AdoptionProcessSteps from '../components/adoption/AdoptionProcessSteps';

const AdoptionsPage = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [animals, setAnimals] = useState([]);
  const [filters, setFilters] = useState({
    category_id: '',
    breed_id: '',
    age: '',
    gender: '',
    size: ''
  });
  // const [filterOptions, setFilterOptions] = useState({
  //   categories: [],
  //   breeds: [],
  //   ages: [],
  //   genders: [],
  //   sizes: []
  // });

  useEffect(() => {
    fetchAdoptionRequests().then(setAdoptionRequests);
    fetchAnimals().then(setAnimals);
    // fetchFilters().then(setFilterOptions);
  }, []);

  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   const data = await fetchAnimals(filters);
  //   setAnimals(data);
  // };

  return (
    <div className="container py-5">
      {/* Adoption Requests */}
      <section>
        <h2 className="text-center fs-3 fw-bold text-primary mb-4"> Adoption Requests</h2>
        <AdoptionRequests requests={adoptionRequests} />
      </section>

      {/* Filter Form */}
      {/* <section>
        <AdoptionFilterForm
          filters={filters}
          onFilterChange={handleFilterChange}
          onSubmit={handleSearch}
          options={filterOptions}
        />
      </section> */}

      {/* Available Animals */}
      <section className="bg-light rounded mb-5">
        <div className="text-center mb-4">
          <h2 className="fs-2 fw-bold text-success">Available Animals</h2>
          <p className="text-muted col-md-8 offset-md-2">
            These adorable friends are waiting for their forever homes. Could you be their perfect match?
          </p>
        </div>
        <AvailableAnimals animals={animals} />
      </section>

      {/* Adoption Process */}
      <section className="pt-4 pb-5">
        <h2 className="text-center fs-3 fw-bold text-primary mb-4">The Adoption Process</h2>
        <AdoptionProcessSteps />
      </section>
    </div>
  );
};

export default AdoptionsPage;
