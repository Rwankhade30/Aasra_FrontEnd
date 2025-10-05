import React from 'react';
import FeaturedAnimalCard from '../../pages/FeaturedAnimalCard';

const defaultExtraAnimals = [
  {
    id: 1,
    name: "Bruno",
    breed: { name: "Labrador" },
    category: { name: "Dog" },
    gender: "male",
    age: "adult",
    size: "large",
    adoption_status: "Available",
    shelter: { name: "Mumbai Animal Aid" },
    tags: ["Friendly", "Energetic"],
    image: "/assets/images/animals/Bruno.jpg",
  },
  {
    id: 2,
    name: "Whiskers",
    breed: { name: "Domestic Short Hair" },
    category: { name: "Cat" },
    gender: "female",
    age: "young",
    size: "small",
    adoption_status: "Available",
    shelter: { name: "Mumbai Animal Aid" },
    tags: ["Playful", "Affectionate"],
    image: "/assets/images/animals/catt.jpg",
  },
  {
    id: 3,
    name: "Thumper",
    breed: { name: "Lop" },
    category: { name: "Rabbit" },
    gender: "male",
    age: "juvenile",
    size: "small",
    adoption_status: "Available",
    shelter: { name: "Delhi Pets Foundation" },
    tags: ["Gentle", "Curious"],
    image: "/assets/images/animals/rabbit.jpg",
  },
  {
    id: 4,
    name: "Daisy",
    breed: { name: "Holstein" },
    category: { name: "Cow" },
    gender: "female",
    age: "adult",
    size: "extra-large",
    adoption_status: "Available",
    shelter: { name: "Kolkata Animal Rescue" },
    tags: ["Calm", "Friendly"],
    image: "/assets/images/animals/cow.jpg",
  },

  // ---------- NEW ANIMALS (10) ----------
  {
    id: 5,
    name: "Rocky",
    breed: { name: "German Shepherd" },
    category: { name: "Dog" },
    gender: "male",
    age: "adult",
    size: "large",
    adoption_status: "Available",
    shelter: { name: "Pune Paws Rescue" },
    tags: ["Loyal", "Active"],
    image: "/assets/images/animals/rocky.jpeg",
  },
  {
    id: 6,
    name: "Bella",
    breed: { name: "Beagle" },
    category: { name: "Dog" },
    gender: "female",
    age: "young",
    size: "medium",
    adoption_status: "Available",
    shelter: { name: "Pune Paws Rescue" },
    tags: ["Curious", "Good with kids"],
    image: "/assets/images/animals/bella.jpeg",
  },
  {
    id: 7,
    name: "Max",
    breed: { name: "Golden Retriever" },
    category: { name: "Dog" },
    gender: "male",
    age: "senior",
    size: "large",
    adoption_status: "Available",
    shelter: { name: "Pune Paws Rescue" },
    tags: ["Calm", "Gentle"],
    image: "/assets/images/animals/dog_max.jpeg",
  },
  {
    id: 8,
    name: "Luna",
    breed: { name: "Indie" },
    category: { name: "Dog" },
    gender: "female",
    age: "juvenile",
    size: "medium",
    adoption_status: "Available",
    shelter: { name: "Pune Paws Rescue" },
    tags: ["Smart", "House-trained"],
    image: "/assets/images/animals/luna.jpeg",
  },
  {
    id: 9,
    name: "Mittens",
    breed: { name: "Siamese" },
    category: { name: "Cat" },
    gender: "female",
    age: "adult",
    size: "small",
    adoption_status: "Available",
    shelter: { name: "Pune Paws Rescue" },
    tags: ["Vocal", "Affectionate"],
    image: "/assets/images/animals/mittens.jpeg",
  },
  {
    id: 10,
    name: "Shadow",
    breed: { name: "Bombay" },
    category: { name: "Cat" },
    gender: "male",
    age: "young",
    size: "small",
    adoption_status: "Available",
    shelter: { name: "Guwahati Rescue & Rehome" },
    tags: ["Playful", "Curious"],
    image: "/assets/images/animals/shadow.jpeg",
  },
  {
    id: 11,
    name: "Ginger",
    breed: { name: "Tabby" },
    category: { name: "Cat" },
    gender: "female",
    age: "juvenile",
    size: "small",
    adoption_status: "Available",
    shelter: { name: "Foster Home" },
    tags: ["Friendly", "Litter-trained"],
    image: "/assets/images/animals/ginger.jpeg",
  },
  {
    id: 12,
    name: "Bindi",
    breed: { name: "Gir" },
    category: { name: "Cow" },
    gender: "female",
    age: "adult",
    size: "extra-large",
    adoption_status: "Available",
    shelter: { name: "Farm Sanctuary" },
    tags: ["Calm", "Pasture-raised"],
    image: "/assets/images/animals/bindi.jpeg",
  },
  {
    id: 13,
    name: "Gauri",
    breed: { name: "Sahiwal" },
    category: { name: "Cow" },
    gender: "female",
    age: "young",
    size: "extra-large",
    adoption_status: "Available",
    shelter: { name: "Farm Sanctuary" },
    tags: ["Gentle", "Healthy"],
    image: "/assets/images/animals/gauri.jpeg",
  },
  {
    id: 14,
    name: "Mohan",
    breed: { name: "Tharparkar" },
    category: { name: "Cow" },
    gender: "male",
    age: "adult",
    size: "extra-large",
    adoption_status: "Available",
    shelter: { name: "Main Shelter" },
    tags: ["Docile", "Strong"],
    image: "/assets/images/animals/mohan.jpeg",
  },
];

const AvailableAnimals = ({ animals = [], extraAnimals = defaultExtraAnimals }) => {
  // Combine provided animals with extras (extras appended)
  const allAnimals = [...animals, ...extraAnimals];

  if (!allAnimals.length) {
    return (
      <p className="text-center text-muted">
        No animals available for adoption at the moment.
      </p>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {allAnimals.map((animal) => (
        <div key={animal.id} className="col">
          {/* Pass the full animal object through — ensure FeaturedAnimalCard handles these fields */}
          <FeaturedAnimalCard animal={animal} />
        </div>
      ))}
    </div>
  );
};

export default AvailableAnimals;
