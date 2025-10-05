// // src/components/adoption/AdoptionFilterForm.jsx
// import React from "react";

// const AdoptionFilterForm = ({ filters = {}, onFilterChange, onSubmit, options = {} }) => {
//   const resetFilters = (e) => {
//     e.preventDefault();
//     ["category_id", "breed_id", "age", "gender", "size"].forEach((name) =>
//       onFilterChange({ target: { name, value: "" } })
//     );
//   };

//   return (
//     <section className="bg-light">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-8">
//             <div className="card border-0 shadow-sm">
//               <div className="card-body p-4">
//                 <h2 className="card-title text-center mb-4 text-success">
//                   Find Your Perfect Match
//                 </h2>
//                 <p className="text-center text-muted mb-4">
//                   Use filters below to search adoptable animals.
//                 </p>

//                 <form onSubmit={onSubmit}>
//                   <div className="row g-3">
//                     {/* Animal Category */}
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Animal Type</label>
//                       <select
//                         name="category_id"
//                         value={filters.category_id || ""}
//                         onChange={onFilterChange}
//                         className="form-select"
//                       >
//                         <option value="">Select</option>
//                         {options.categories?.map((cat) => (
//                           <option key={cat.id} value={cat.id}>
//                             {cat.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Breed */}
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Breed</label>
//                       <select
//                         name="breed_id"
//                         value={filters.breed_id || ""}
//                         onChange={onFilterChange}
//                         className="form-select"
//                       >
//                         <option value="">Select</option>
//                         {options.breeds?.map((breed) => (
//                           <option key={breed.id} value={breed.id}>
//                             {breed.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Age */}
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Age</label>
//                       <select
//                         name="age"
//                         value={filters.age || ""}
//                         onChange={onFilterChange}
//                         className="form-select"
//                       >
//                         <option value="">Select</option>
//                         {options.ages?.map((age, i) => (
//                           <option key={i} value={age}>
//                             {age}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Gender */}
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Gender</label>
//                       <select
//                         name="gender"
//                         value={filters.gender || ""}
//                         onChange={onFilterChange}
//                         className="form-select"
//                       >
//                         <option value="">Select</option>
//                         {options.genders?.map((gender, i) => (
//                           <option key={i} value={gender}>
//                             {gender}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Size */}
//                     <div className="col-md-6">
//                       <label className="form-label fw-semibold">Size</label>
//                       <select
//                         name="size"
//                         value={filters.size || ""}
//                         onChange={onFilterChange}
//                         className="form-select"
//                       >
//                         <option value="">Select</option>
//                         {options.sizes?.map((size, i) => (
//                           <option key={i} value={size}>
//                             {String(size).replace(/_/g, " ")}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   {/* Buttons */}
//                   <div className="text-center mt-4">
//                     <button
//                       type="submit"
//                       className="btn btn-success btn-lg me-2"
//                     >
//                       Search
//                     </button>
//                     <button
//                       onClick={resetFilters}
//                       className="btn btn-outline-secondary btn-lg"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AdoptionFilterForm;
