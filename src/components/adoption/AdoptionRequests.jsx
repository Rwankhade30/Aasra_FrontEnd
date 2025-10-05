import React, { useState } from 'react';

const AdoptionRequests = ({ requests: initialRequests }) => {
  const [requests, setRequests] = useState(initialRequests || []);
  const [editingId, setEditingId] = useState(null);
  const [editedRequest, setEditedRequest] = useState({});

  const handleEditClick = (req) => {
    setEditingId(req.id);
    setEditedRequest({ ...req });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedRequest({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    setRequests((prevRequests) =>
      prevRequests.map((req) =>
        req.id === editingId ? { ...req, ...editedRequest } : req
      )
    );
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      setRequests((prev) => prev.filter((req) => req.id !== id));
    }
  };

  if (!requests || requests.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Adopt Your Best Friend Today!
      </p>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {requests.map((req) => (
        <div
          key={req.id || Math.random()}
          className="shadow-lg p-6 rounded-xl border-l-4 border-teal bg-white"
        >
          <div className="flex justify-between items-center mb-3">
            <h5 className="text-teal font-semibold">
              🐾 {req.animal?.name || 'Unknown'}
            </h5>
            <span className="bg-orange text-white px-3 py-1 rounded-full text-sm capitalize">
              {req.status}
            </span>
          </div>

          {editingId === req.id ? (
            <div className="space-y-2">
              <div>
                <label className="text-sm">Housing:</label>
                <input
                  type="text"
                  name="housing_type"
                  value={editedRequest.housing_type}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div>
                <label className="text-sm">Have Pets?</label>
                <select
                  name="have_pets"
                  value={editedRequest.have_pets ? 'Yes' : 'No'}
                  onChange={(e) =>
                    setEditedRequest((prev) => ({
                      ...prev,
                      have_pets: e.target.value === 'Yes',
                    }))
                  }
                  className="form-control"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Experience:</label>
                <input
                  type="text"
                  name="experience"
                  value={editedRequest.experience}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div>
                <label className="text-sm">Preferred Pet:</label>
                <input
                  type="text"
                  name="preferred_pet"
                  value={editedRequest.preferred_pet}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="flex gap-2 mt-3">
                <button className="btn btn-success btn-sm" onClick={handleSaveEdit}>
                  Save
                </button>
                <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <p>
                <strong>Housing:</strong> {req.housing_type}
              </p>
              <p>
                <strong>Have Pets?</strong> {req.have_pets ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Experience:</strong> {req.experience}
              </p>
              <p>
                <strong>Preferred Pet:</strong> {req.preferred_pet}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Submitted:</strong>{' '}
                {new Date(req.created_at).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEditClick(req)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(req.id)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdoptionRequests;
