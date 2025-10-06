// src/components/Shelters.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";

/**
 * Shelters (single-file component with cards + server integration)
 *
 * Props:
 *  - apiBase (string) optional base for API endpoints, default "/api/shelters"
 *  - initialLocation, initialName
 *  - initialLimit (number) how many random items to fetch on first visit (default 15)
 *
 * Behavior:
 *  - On mount: fetch `/api/shelters?limit=${initialLimit}` (no location/name -> server returns random sample)
 *  - On submit/search: fetch `/api/shelters?location=...&name=...` and render results
 *
 * Notes:
 *  - The server should return { data: [...], meta: {...} } (data is an array).
 *  - This component still supports being provided `shelterData` as a prop if you want to lift state:
 *      <Shelters shelterData={[]} /> will use that instead of fetching.
 */

export default function Shelters({
  apiBase = "/api/shelters",
  initialLocation = "",
  initialName = "",
  initialLimit = 15,
  shelterData: shelterDataProp = null, // optional external data override
}) {
  const prefix = "aasra-shelters";

  // form state
  const [location, setLocation] = useState(initialLocation || "");
  const [name, setName] = useState(initialName || "");

  // server data + ui state
  const [data, setData] = useState(Array.isArray(shelterDataProp) ? shelterDataProp : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // track meta if provided by API
  const [meta, setMeta] = useState(null);

  // used to cancel inflight fetches
  const controllerRef = useRef(null);

  // derive resultsCount
  const resultsCount = data.length;

  // Helper to read token (from previous login/register JSON)
  const getAccessToken = () => localStorage.getItem("token");

  // Helper: safely build URL with params
  const buildUrl = (params = {}) => {
    const url = new URL(apiBase, "http://localhost:5000");  // 👈 force port 5000
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== "")
        url.searchParams.set(k, String(v).trim());
    });
    return url.toString(); // keep full URL since it's now fixed
  };

  // fetch function (cancels previous) — now includes Authorization header when token exists
  const fetchFromApi = async (params = {}, { signal } = {}) => {
    const url = buildUrl(params);

    const headers = {};
    const token = getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, {
      signal,
      credentials: "include",
      mode: "cors"
    });

    
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Fetch error ${res.status}${text ? `: ${text}` : ""}`);
    }
    const json = await res.json();
    // support two shapes: { data: [...] } or direct array
    const returnedData = Array.isArray(json) ? json : Array.isArray(json.data) ? json.data : [];
    const returnedMeta = json && json.meta ? json.meta : null;
    return { data: returnedData, meta: returnedMeta };
  };

  // initial load -> random sample when no search criteria
  useEffect(() => {
    // if user passed shelterDataProp, don't auto-fetch initial sample
    if (Array.isArray(shelterDataProp) && shelterDataProp.length) {
      setData(shelterDataProp);
      return;
    }

    // cancel prior
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: fetched, meta: fetchedMeta } = await fetchFromApi({ limit: initialLimit }, { signal: controller.signal });
        if (!mounted) return;
        setData(fetched || []);
        setMeta(fetchedMeta);
      } catch (err) {
        if (err.name === "AbortError") {
          // aborted -> ignore
        } else {
          console.error("Initial shelters fetch failed:", err);
          if (mounted) setError(err.message || "Failed to load shelters");
          setData([]); // clear on error
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
      controllerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLimit, shelterDataProp]); // re-run if initialLimit or shelterDataProp changes

  // If parent supplies shelterDataProp later, update data
  useEffect(() => {
    if (Array.isArray(shelterDataProp)) {
      setData(shelterDataProp);
    }
  }, [shelterDataProp]);

  // submit handler -> call API with location/name
  const submit = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    // cancel previous
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    // build params only when not empty
    const params = {};
    if (location && String(location).trim()) params.location = location.trim();
    if (name && String(name).trim()) params.name = name.trim();

    setLoading(true);
    setError(null);
    try {
      const { data: fetched, meta: fetchedMeta } = await fetchFromApi(params, { signal: controller.signal });
      setData(fetched || []);
      setMeta(fetchedMeta);
    } catch (err) {
      if (err.name === "AbortError") {
        // ignore
      } else {
        console.error("Shelters search error:", err);
        setError(err.message || "Search failed");
        setData([]); // clear results on failure
      }
    } finally {
      setLoading(false);
      controllerRef.current = null;
    }
  };

  // quick clear function
  const clearFilters = () => {
    setLocation("");
    setName("");
    // fetch initial random sample again (if not using shelterDataProp)
    if (!Array.isArray(shelterDataProp)) {
      // trigger same logic as initial load
      (async () => {
        if (controllerRef.current) controllerRef.current.abort();
        const ctrl = new AbortController();
        controllerRef.current = ctrl;
        setLoading(true);
        setError(null);
        try {
          const { data: fetched, meta: fetchedMeta } = await fetchFromApi({ limit: initialLimit }, { signal: ctrl.signal });
          setData(fetched || []);
          setMeta(fetchedMeta);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("Clear filters fetch failed:", err);
            setError(err.message || "Failed to reload shelters");
            setData([]);
          }
        } finally {
          setLoading(false);
          controllerRef.current = null;
        }
      })();
    } else {
      // if parent supplied data, just reset to it
      setData(shelterDataProp || []);
    }
  };

  // memoized cards markup
  const cards = useMemo(
    () =>
      (data || []).map((s) => (
        <article key={s._id || s.id || Math.random()} className={`${prefix}-cardItem`} role="listitem">
          <div className={`${prefix}-logoWrap`}>
            <img src={s.logo || "/assets/images/no-logo.png"} alt={`${s.name || "Shelter"} logo`} className={`${prefix}-logo`} />
          </div>

          <div className={`${prefix}-cardBody`}>
            <h3 className={`${prefix}-cardTitle`}>{s.name || "Unnamed Shelter"}</h3>

            <div className={`${prefix}-metaRow`}>
              <span className={`${prefix}-metaIcon`} aria-hidden>
                🏠
              </span>
              <span className={`${prefix}-metaText`}>{s.city || s.pincode || "—"}</span>
            </div>

            <div className={`${prefix}-metaRow`}>
              <span className={`${prefix}-metaIcon`} aria-hidden>
                📞
              </span>
              <span className={`${prefix}-metaText`}>{s.phone || "—"}</span>
            </div>

            <p className={`${prefix}-desc`}>{s.description || ""}</p>

            <div className={`${prefix}-cardActions`}>
              <a
                href={s.viewLink || "#"}
                className={`${prefix}-btn`}
                onClick={(e) => {
                  // preserve normal link behavior for real links; prevent if it's just "#"
                  if (!s.viewLink || s.viewLink === "#") {
                    e.preventDefault();
                    // placeholder action: log
                    console.log("View pets for", s.name || s.id || s._id);
                  }
                }}
              >
                VIEW PETS
              </a>
            </div>
          </div>
        </article>
      )),
    [data]
  );

  return (
    <section className={`${prefix}-wrapper`}>
      {/* Scoped styles */}
      <style>
        {`
    /* === ${prefix} styles === */
    .${prefix}-wrapper {    
      max-width: 1200px;
      margin: 28px auto;
      padding: 8px 18px 48px;
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    }

    .${prefix}-title {
      font-size: 32px;
      font-weight: 700;
      color: #111827;
      margin: 8px 0 18px;
    }

    /* SEARCH FORM CARD */
    .${prefix}-card {
      display: grid;
      grid-template-columns: 1fr 80px 1fr 200px;
      gap: 18px;
      align-items: end;
      background: #ffffff;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #edf2f7;
      box-shadow: 0 8px 24px rgba(16,24,40,0.04);
    }
    .${prefix}-field { display:flex; flex-direction:column; }
    .${prefix}-label { font-size: 12px; color: #6b7280; margin-bottom: 8px; font-weight:600; }
    .${prefix}-input {
      padding: 12px 16px;
      border-radius: 8px;
      border: 1px solid #e6e9ef;
      font-size: 15px;
      color: #111827;
      outline: none;
      box-shadow: 0 2px 6px rgba(16,24,40,0.02);
    }
    .${prefix}-input::placeholder { color: #9CA3AF; }
    .${prefix}-input:focus { border-color: #0d6efd}

    /* Keep OR spacing same */
    .${prefix}-or { text-align:center; font-weight:700; color:#9aa4b2; font-size:14px; margin-bottom:15px; }
    .${prefix}-action { display:flex; justify-content:center; align-items:center; }

    /* === CHANGED: search button default is WHITE with blue text/border === */
    .${prefix}-searchBtn {
      display:inline-block;
      padding:10px 16px;
      color:#0d6efd;                 /* blue text by default */
      background: #ffffff;           /* white background by default */
      border-radius:999px;
      text-decoration:none;
      font-weight:700;
      box-shadow: 0 8px 22px rgba(13,110,253,0.06);
      border-color: #0d6efd;
      border: 1px solid #0d6efd;    /* blue border */
      transition: background .12s ease, color .12s ease, box-shadow .12s ease, transform .08s ease;
    }

    /* Hover => blue background, white text (existing behavior) */
    .${prefix}-searchBtn:hover{
      box-shadow: 0 8px 22px rgba(13,110,253,0.18);
      background: #0d6efd;
      color: white;
      text-decoration:none;
      transform: translateY(-2px);
    }

    /* Keep other button/icon styles */
    .${prefix}-searchIcon {
      stroke: rgba(0,0,0,0.65);
      width: 18px;
      height: 18px;
      margin-right: 6px;
    }
    .${prefix}-searchText {
      letter-spacing: 0.6px;
      font-size: 14px;
    }

    .${prefix}-results { grid-column: 1 / -1; margin-top: 12px; color:#6b7280; font-size:15px; }
    .${prefix}-resultsCount{ font-weight:700; color:#111827; margin-right:8px; }

    /* CARDS GRID */
    .${prefix}-grid {
      margin-top: 22px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
    }

    .${prefix}-cardItem {
      display:flex;
      gap: 18px;
      background:white;
      padding: 22px;
      border-radius: 10px;
      box-shadow: 0 8px 20px rgba(16,24,40,0.04);
      border: 1px solid #eef2f6;
      align-items: center;
    }

    .${prefix}-logoWrap { flex: 0 0 120px; display:flex; align-items:center; justify-content:center; }
    .${prefix}-logo { width: 100px; height:100px; object-fit:contain; border-radius:8px; background:#fff; }

    .${prefix}-cardBody { flex:1; }
    .${prefix}-cardTitle { color:#000000; font-size:18px; margin:0 0 8px; font-weight:700; }
    .${prefix}-metaRow { display:flex; gap:10px; align-items:center; color:#6b7280; margin-bottom:6px; font-size:14px; }
    .${prefix}-metaIcon { font-size:16px; opacity:0.9; }
    .${prefix}-metaText { color:#374151; }
    .${prefix}-desc { margin-top:8px; color:#6b7280; font-size:14px; margin-bottom:12px; }

    .${prefix}-cardActions { margin-top:8px; }
    .${prefix}-btn {
      display:inline-block;
      padding:10px 16px;
      color:#0d6efd;
      border-radius:999px;
      text-decoration:none;
      font-weight:700;
      box-shadow: 0 8px 22px rgba(13,110,253,0.06);
      border-color: #0d6efd;
      border: 1px solid #0d6efd;
    }

    .${prefix}-btn:hover{
      box-shadow: 0 8px 22px rgba(13,110,253,0.18);
      background: #0d6efd;
      color: white;
      text-decoration:none;
    }

    .${prefix}-background {
      background-image: url("/assets/images/shelter.png");
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      background-attachment: fixed; /* parallax-like on desktop */
      position: relative;
      padding-top: 40px;
      padding-bottom: 40px;
    }

    /* disable fixed attachment on mobile for performance */
    @media (max-width: 768px) {
      .${prefix}-background {
        background-attachment: scroll;
        background-position: center 40%;
      }
    }

    /* responsive */
    @media (max-width: 980px) {
      .${prefix}-grid { grid-template-columns: 1fr; }
      .${prefix}-card { grid-template-columns: 1fr; gap:12px; align-items:stretch; }
      .${prefix}-or { display:none; }
      .${prefix}-action { justify-content:flex-end; }
    }
    @media (max-width: 480px) {
      .${prefix}-wrapper { padding-left:12px; padding-right:12px; }
      .${prefix}-title { font-size:24px; }
    }
    /* end styles */
    `}
      </style>

      <section className={`${prefix}-background`}>
        <h2 className={`${prefix}-title`}>Search for Animal Shelters or Rescues</h2>

        <form className={`${prefix}-card`} onSubmit={submit} aria-label="Search for animal shelters or rescues">
          <div className={`${prefix}-field`}>
            <label className={`${prefix}-label`} htmlFor="shelter-location">Location</label>
            <input
              id="shelter-location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, state or postcode"
              className={`${prefix}-input`}
              autoComplete="off"
            />
          </div>

          <div className={`${prefix}-or`}>or</div>

          <div className={`${prefix}-field`}>
            <label className={`${prefix}-label`} htmlFor="shelter-name">Enter Shelter or Rescue Name</label>
            <input
              id="shelter-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Main Shelter or Rescue XYZ"
              className={`${prefix}-input`}
              autoComplete="off"
            />
          </div>

          <div className={`${prefix}-action`}>
            <button type="submit" className={`${prefix}-searchBtn`} aria-label="Search" disabled={loading}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ marginRight: 6 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
              </svg>
              <span>SEARCH</span>
            </button>
          </div>

          <div className={`${prefix}-results`}>
            <span className={`${prefix}-resultsCount`}>{resultsCount}</span> Results
            <button
              type="button"
              onClick={clearFilters}
              style={{ marginLeft: 12, padding: "6px 10px", borderRadius: 8, border: "1px solid #e6e9ef", background: "#fff", cursor: "pointer" }}
            >
              Clear
            </button>
            {loading && <span style={{ marginLeft: 12 }}>Loading…</span>}
            {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
          </div>
        </form>

        {/* CARDS GRID */}
        <div className={`${prefix}-grid`} role="list" aria-live="polite">
          {cards.length ? cards : (
            <div style={{ padding: 20, gridColumn: "1 / -1", color: "#6b7280" }}>
              {loading ? "Loading shelters…" : "No shelters found."}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
