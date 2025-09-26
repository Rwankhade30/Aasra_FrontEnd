// src/components/rescue/RescueForm.jsx
import React, { useState, useRef } from 'react';
import "../rescue/RescueForm.css";

const RescueForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    location: '',
    description: '',
    contact_name: '',
    contact_number: '',
    category: '',   // <-- NEW: animal category
    urgency: '',    // <-- NEW: severity/urgency ('severe'|'moderate')
    status: 'Requested',
  });

  const [preview, setPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rescues, setRescues] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
      stopCamera();
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setCameraOn(true);
      }
    } catch (err) {
      alert('Camera access error: ' + (err.message || err));
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      try { videoRef.current.pause(); videoRef.current.srcObject = null; } catch {}
    }
    setCameraOn(false);
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!video) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(blob => {
      setFormData(prev => ({ ...prev, image: blob }));
      setPreview(URL.createObjectURL(blob));
      stopCamera();
    }, 'image/jpeg');
  };

  const discardPhoto = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setPreview(null);
    stopCamera();
  };

  const validate = () => {
    const errs = {};
    if (!formData.location.trim()) errs.location = 'Location is required';
    if (!formData.description.trim()) errs.description = 'Description is required';
    if (!formData.category) errs.category = 'Please select an animal category';
    if (!formData.urgency) errs.urgency = 'Please select the urgency';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    const newRescue = {
      id: Date.now(),
      ...formData,
      status: 'Requested',
      preview
    };

    setLoading(true);
    setTimeout(() => {
      setRescues(prev => [newRescue, ...prev]);
      setSubmitted(true);
      setFormData({
        image: null,
        location: '',
        description: '',
        contact_name: '',
        contact_number: '',
        category: '',
        urgency: '',
        status: 'Requested'
      });
      setPreview(null);
      setFieldErrors({});
      setLoading(false);
      setTimeout(() => setSubmitted(false), 3000);
    }, 700);
  };

  return (
    <section id="report-section" className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h2 className="card-title text-center mb-4 text-success">Report an Animal in Need</h2>

                {submitted && (
                  <div className="alert alert-success" role="alert">
                    Rescue report submitted successfully. Thank you!
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">

                    {/* Image upload / camera */}
                    <div className="col-12">
                      <label className="form-label"><strong>Upload Image </strong></label>
                      <input
                        type="file"
                        name="image"
                        className="form-control"
                        accept="image/*"
                        onChange={handleChange}
                        disabled={!!preview}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label d-block"><strong>Or Take Photo</strong></label>
                      <div className="mb-2">
                        <button
                          type="button"
                          className="btn btn-outline-secondary me-2"
                          onClick={startCamera}
                          disabled={cameraOn || preview}
                        >
                          Start Camera
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-primary me-2"
                          onClick={capturePhoto}
                          disabled={!cameraOn}
                        >
                          Capture
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={discardPhoto}
                          disabled={!preview && !cameraOn}
                        >
                          Discard Photo
                        </button>
                      </div>

                      <video
                        ref={videoRef}
                        className="video-preview"
                        style={{ display: cameraOn ? 'block' : 'none', width: '100%', maxHeight: '300px' }}
                      />
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>

                    {/* === NEW: ANIMAL CATEGORY DROPDOWN === */}
                    <div className="col-12">
                      <label className="form-label"><strong>Animal Category </strong></label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value=""> Select animal category </option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="cow">Cow</option>
                        <option value="buffalo">Buffalo</option>
                        <option value="goat">Goat</option>
                        <option value="sheep">Sheep</option>
                        <option value="horse">Horse</option>
                        <option value="donkey">Donkey</option>
                        <option value="snake">Snake</option>
                      </select>
                      {fieldErrors.category && <div className="field-error text-danger mt-1">{fieldErrors.category}</div>}
                    </div>

                    {/* === NEW: URGENCY RADIO BUTTONS === */}
                    <div className="col-12"> 
                      <label className="form-label d-block"><strong>Urgency type</strong></label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="urgency"
                          id="urgency-severe"
                          value="severe"
                          checked={formData.urgency === 'severe'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="urgency-severe">
                          Need emergency diagnosis (severe)
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="urgency"
                          id="urgency-moderate"
                          value="moderate"
                          checked={formData.urgency === 'moderate'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="urgency-moderate">
                          Need medical care (moderate/minor)
                        </label>
                      </div>
                      {fieldErrors.urgency && <div className="field-error text-danger mt-1">{fieldErrors.urgency}</div>}
                    </div>

                    {/* preview */}
                    {preview && (
                      <div className="col-12">
                        <label className="form-label">Preview</label>
                        <img src={preview} alt="Preview" className="img-fluid preview mb-2" />
                      </div>
                    )}

                    {/* other fields */}
                    <div className="col-12">
                      <label className="form-label"><strong>Location </strong></label>
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        required
                        value={formData.location}
                        onChange={handleChange}
                      />
                      {fieldErrors.location && <div className="field-error text-danger mt-1">{fieldErrors.location}</div>}
                    </div>

                    <div className="col-12">
                      <label className="form-label"><strong>Description </strong></label>
                      <textarea
                        name="description"
                        className="form-control"
                        required
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                      />
                      {fieldErrors.description && <div className="field-error text-danger mt-1">{fieldErrors.description}</div>}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Your Name (optional)</label>
                      <input
                        type="text"
                        name="contact_name"
                        className="form-control"
                        value={formData.contact_name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Contact Number (optional)</label>
                      <input
                        type="tel"
                        name="contact_number"
                        className="form-control"
                        value={formData.contact_number}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12 text-center mt-3">
                      <button type="submit" className="btn btn-success btn-lg" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Rescue'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* submitted list */}
            {rescues.length > 0 && (
              <div className="mt-5">
                <h4 className="text-center mb-3">Submitted Rescues</h4>
                {rescues.map((rescue) => (
                  <div key={rescue.id} className="rescue-card mb-3 p-3 border rounded">
                    <div className="d-flex align-items-start gap-3">
                      {rescue.preview && (
                        <img src={rescue.preview} alt="Submitted" style={{ width: 140, height: 'auto', objectFit: 'cover', borderRadius: 6 }} className="me-3" />
                      )}
                      <div style={{ flex: 1 }}>
                        <p className="mb-1"><strong>Category:</strong> {rescue.category || '—'}</p>
                        <p className="mb-1"><strong>Location:</strong> {rescue.location}</p>
                        <p className="mb-1"><strong>Description:</strong> {rescue.description}</p>
                        {rescue.contact_name && <p className="mb-1"><strong>Reported by:</strong> {rescue.contact_name}</p>}
                        {rescue.contact_number && <p className="mb-1"><strong>Contact:</strong> {rescue.contact_number}</p>}
                        <p className="mb-1">
                          <strong>Urgency:</strong>{' '}
                          {rescue.urgency === 'severe' ? (
                            <span className="badge bg-danger">Severe</span>
                          ) : rescue.urgency === 'moderate' ? (
                            <span className="badge bg-info text-dark">Moderate / Minor</span>
                          ) : (
                            <span className="badge bg-secondary">—</span>
                          )}
                        </p>
                        <p className="mb-0"><strong>Status:</strong> <span className="badge bg-warning text-dark">{rescue.status}</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default RescueForm;
