// src/components/ViewPets.jsx
import React, { useEffect, useState, useMemo } from "react";

/**
 * ViewPets
 *
 * Props:
 *  - shelterId (string) : ID of the shelter whose pets to show
 *  - apiBase (string)   : base URL of pets API (default "/api/pets")
 *
 * API expected:
 *   GET /api/pets?shelterId=xxx
 *   -> { data: [ {id, name, age, breed, gender, size, city, photo, description, shelter }, ... ] }
 */
export default function ViewPets({ shelterId, apiBase = "http://localhost:5000/api/pets" }) {
  const prefix = "aasra-pets";
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // fetch pets when shelterId changes
  useEffect(() => {
    if (!shelterId) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const url = `${apiBase}?shelterId=${encodeURIComponent(shelterId)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        const json = await res.json();
        if (!cancelled) setPets(Array.isArray(json.data) ? json.data : []);
      } catch (err) {
        if (!cancelled) setError(err.message || "Error loading pets");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [shelterId, apiBase]);

  const cards = useMemo(
    () =>
      pets.map((p) => (
        <article key={p.id} className={`${prefix}-card`} role="listitem">
          <div className={`${prefix}-imgWrap`}>
            <img src={p.photo} alt={`${p.name}`} className={`${prefix}-img`} />
          </div>
          <div className={`${prefix}-body`}>
            <h3 className={`${prefix}-name`}>{p.name}</h3>
            <ul className={`${prefix}-meta`}>
              <li><strong>Breed:</strong> {p.breed}</li>
              <li><strong>Age:</strong> {p.age}</li>
              <li><strong>Gender:</strong> {p.gender}</li>
              <li><strong>Size:</strong> {p.size}</li>
              <li><strong>Location:</strong> {p.city}</li>
            </ul>
            {p.description && <p className={`${prefix}-desc`}>{p.description}</p>}
            {p.shelter && <p className={`${prefix}-shelter`}>
              Shelter: <span>{p.shelter.name}</span>
            </p>}
          </div>
        </article>
      )),
    [pets]
  );

  return (
    <section className={`${prefix}-wrapper`}>
      <style>{`
        .${prefix}-wrapper {
          max-width: 1000px;
          margin: 28px auto;
          padding: 12px 18px 48px;
          font-family: Inter, system-ui, sans-serif;
        }
        .${prefix}-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 18px;
        }
        .${prefix}-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 18px;
        }
        .${prefix}-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        .${prefix}-imgWrap { width: 100%; height: 200px; overflow:hidden; }
        .${prefix}-img { width: 100%; height: 100%; object-fit: cover; }
        .${prefix}-body { padding: 16px; flex:1; }
        .${prefix}-name { font-size: 18px; font-weight: 700; margin: 0 0 8px; }
        .${prefix}-meta { list-style:none; padding:0; margin:0 0 8px; font-size:14px; color:#374151; }
        .${prefix}-meta li { margin-bottom:4px; }
        .${prefix}-desc { font-size: 14px; color:#6b7280; margin-bottom: 8px; }
        .${prefix}-shelter { font-size: 13px; color:#4b5563; font-style: italic; }
      `}</style>

      <h2 className={`${prefix}-title`}>Available Pets</h2>

      {loading && <p>Loading pets…</p>}
      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div className={`${prefix}-grid`} role="list">
        {cards.length ? cards : !loading && !error ? <p>No pets found.</p> : null}
      </div>
    </section>
  );
}
