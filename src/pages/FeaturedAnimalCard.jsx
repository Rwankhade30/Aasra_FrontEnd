import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeaturedAnimalCard = ({ animal }) => {
  const [favorited, setFavorited] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setFavorited((prev) => !prev);
  };

  const handleRequestAdoption = () => {
    // ✅ Navigate to adoption-form with animal name
    navigate("/adoption-form", { state: { animalName: animal.name } });
  };

  return (
    <div className="col">
      <div className="card h-100 shadow-sm border-0">
        {/* Image Section */}
        <div className="position-relative" style={{ height: "250px", overflow: "hidden" }}>
          {animal?.image ? (
            <img
              src={animal.image}
              alt={animal.name || "Animal"}
              className="card-img-top h-100 object-fit-cover"
            />
          ) : (
            <div className="w-100 h-100 bg-light d-flex align-items-center justify-content-center text-muted">
              No Image
            </div>
          )}

          <span
            className="position-absolute top-0 end-0 m-2 badge bg-warning text-white"
            style={{ fontSize: "0.7rem" }}
          >
            {animal.species || animal.category?.name || "Unknown"}
          </span>
        </div>

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h5 className="card-title mb-1">{animal.name || "Unnamed"}</h5>
              <p className="text-muted small mb-1">
                {animal.breed?.name || animal.breed || "Unknown"}
              </p>
            </div>
            <span className="badge border text-info small">
              {animal.gender || "Unknown"}
            </span>
          </div>

          <div className="text-muted small d-flex align-items-center mt-2">
            <i className="bi bi-calendar me-2" aria-hidden="true"></i>
            {animal.age || "Unknown age"}
          </div>

          <div className="text-muted small d-flex align-items-center mt-1">
            <i className="bi bi-geo-alt me-2 text-info" aria-hidden="true"></i>
            {animal.location || animal.shelter?.name || "Unknown location"}
          </div>

          {/* Tags */}
          {animal.tags?.length > 0 && (
            <div className="mt-2">
              {animal.tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge bg-light text-dark me-1 mb-1"
                  style={{ fontSize: "0.7rem" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="card-footer bg-white border-0 d-flex gap-2 justify-content-between">
          <button
            onClick={handleRequestAdoption}
            className="btn w-100"
            style={{
              backgroundColor: "#14b8a6",
              color: "#ffffff",
              fontWeight: "500",
              fontSize: "0.9rem",
              borderRadius: "0.375rem",
              textAlign: "center",
              padding: "0.4rem 1rem",
            }}
          >
            Request Adoption
          </button>

          <button
            className={`btn btn-sm ${favorited ? "btn-warning text-white" : "btn-outline-warning"}`}
            aria-label="Add to Favorites"
            onClick={toggleFavorite}
          >
            <i className={`bi ${favorited ? "bi-heart-fill" : "bi-heart"}`} aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedAnimalCard;
