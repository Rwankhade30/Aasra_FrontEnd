import React, { useState, useRef } from 'react';
import "../rescue/RescueForm.css";

const RescueForm = () => {
  const [formData, setFormData] = useState({
    image: null,
    location: '',
    description: '',
    contact_name: '',
    contact_number: '',
    status: 'Pending', // ✅ Default status
  });

  const [preview, setPreview] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rescues, setRescues] = useState([]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
      setPreview(URL.createObjectURL(files[0]));
      stopCamera();
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
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
      alert('Camera access error: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
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
      setFormData(prev => ({
        ...prev,
        image: blob
      }));
      setPreview(URL.createObjectURL(blob));
      stopCamera();
    }, 'image/jpeg');
  };

  const discardPhoto = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    setPreview(null);
    stopCamera();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRescue = {
      id: Date.now(),
      ...formData,
      status: 'Pending', // ✅ Ensure it's set explicitly
      preview
    };

    setLoading(true);

    setTimeout(() => {
      setRescues(prev => [newRescue, ...prev]);
      setSubmitted(true);

      // Reset form
      setFormData({
        image: null,
        location: '',
        description: '',
        contact_name: '',
        contact_number: '',
        status: 'Pending'
      });
      setPreview(null);
      setLoading(false);

      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
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
                    <div className="col-12">
                      <label className="form-label"><strong>Upload Image *</strong></label>
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
                          className="btn btn-outline-primary"
                          onClick={capturePhoto}
                          disabled={!cameraOn}
                        >
                          Capture
                        </button>
                      </div>

                      <video
                        ref={videoRef}
                        className="video-preview"
                        style={{ display: cameraOn ? 'block' : 'none', width: '100%', maxHeight: '300px' }}
                      />
                      <canvas ref={canvasRef} style={{ display: 'none' }} />
                    </div>

                    {preview && (
                      <div className="col-12">
                        <label className="form-label">Preview</label>
                        <img src={preview} alt="Preview" className="img-fluid preview mb-2" />
                        <div>
                          <button type="button" className="btn btn-sm btn-warning" onClick={discardPhoto}>
                            Discard Photo
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="col-12">
                      <label className="form-label"><strong>Location *</strong></label>
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        required
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label"><strong>Description *</strong></label>
                      <textarea
                        name="description"
                        className="form-control"
                        required
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                      />
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

            {rescues.length > 0 && (
              <div className="mt-5">
                <h4 className="text-center mb-3">Submitted Rescues</h4>
                {rescues.map((rescue) => (
                  <div key={rescue.id} className="rescue-card mb-3">
                    {rescue.preview && (
                      <img src={rescue.preview} alt="Submitted" className="img-fluid mb-2" />
                    )}
                    <p><strong>Location:</strong> {rescue.location}</p>
                    <p><strong>Description:</strong> {rescue.description}</p>
                    {rescue.contact_name && <p><strong>Reported by:</strong> {rescue.contact_name}</p>}
                    {rescue.contact_number && <p><strong>Contact:</strong> {rescue.contact_number}</p>}
                    <p><strong>Status:</strong> <span className="badge bg-warning text-dark">{rescue.status}</span></p>
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
