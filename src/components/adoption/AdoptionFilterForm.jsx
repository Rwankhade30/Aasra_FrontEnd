import React from 'react';

const AdoptionFilterForm = ({ filters, onFilterChange, onSubmit, options }) => {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-2 md:grid-cols-5 gap-4 items-end">
      
      {/* Animal Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Animal Type</label>
        <select
          name="category_id"
          value={filters.category_id || ''}
          onChange={onFilterChange}
          className="form-select w-full border-gray-300 rounded-md"
        >
          <option value="">Select</option>
          {options.categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Breed */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Breed</label>
        <select
          name="breed_id"
          value={filters.breed_id || ''}
          onChange={onFilterChange}
          className="form-select w-full border-gray-300 rounded-md"
        >
          <option value="">Select</option>
          {options.breeds?.map((breed) => (
            <option key={breed.id} value={breed.id}>{breed.name}</option>
          ))}
        </select>
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <select
          name="age"
          value={filters.age || ''}
          onChange={onFilterChange}
          className="form-select w-full border-gray-300 rounded-md"
        >
          <option value="">Select</option>
          {options.ages?.map((age, i) => (
            <option key={i} value={age}>{age}</option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Gender</label>
        <select
          name="gender"
          value={filters.gender || ''}
          onChange={onFilterChange}
          className="form-select w-full border-gray-300 rounded-md"
        >
          <option value="">Select</option>
          {options.genders?.map((gender, i) => (
            <option key={i} value={gender}>{gender}</option>
          ))}
        </select>
      </div>

      {/* Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Size</label>
        <select
          name="size"
          value={filters.size || ''}
          onChange={onFilterChange}
          className="form-select w-full border-gray-300 rounded-md"
        >
          <option value="">Select</option>
          {options.sizes?.map((size, i) => (
            <option key={i} value={size}>{size.replace('_', ' ')}</option>
          ))}
        </select>
      </div>

      {/* Search Button */}
      <div className="col-span-2 md:col-span-5 text-center mt-2">
        <button
          type="submit"
          className="btn bg-teal text-white px-6 py-2 rounded hover:bg-teal-dark transition duration-200"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default AdoptionFilterForm;
