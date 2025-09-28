// src/api/adoptions.js

export const fetchAdoptionRequests = async () => {
  return [
    {
      id: 1,
      animal: { name: "Tommy" },
      housing_type: "Apartment",
      have_pets: true,
      experience: "We had two dogs before.",
      preferred_pet: "Golden Retriever",
      status: "requested",
      created_at: "2025-06-20T12:00:00Z"
    }
  ];
};

export const fetchAnimals = async () => {
  return []
};

export const fetchFilters = async () => {
  return {
    categories: [
      { id: 1, name: 'Dog' },
      { id: 2, name: 'Cat' },
      { id: 3, name: 'Rabbit' }
    ],
    breeds: [
      { id: 1, name: 'Labrador' },
      { id: 2, name: 'Golden Retriever' },
      { id: 3, name: 'Persian' }
    ],
    ages: ['puppy', 'adult', 'senior'],
    genders: ['male', 'female'],
    sizes: ['small', 'medium', 'large']
  };
};
