// src/components/Shelters.jsx
import React, { useState, useMemo } from "react";

/**
 * Shelters (single-file component with cards)
 *
 * Props:
 *  - onSearch({ location, name }) => Promise or void (optional)
 *  - initialLocation, initialName
 *  - shelterData: array of shelter objects (optional, uses sample if not provided)
 *
 * Shelter object shape (example):
 * {
 *   id: 1,
 *   name: "Guam Animals In Need",
 *   city: "Mangilao, GU",
 *   phone: "(671) 653-4246",
 *   logo: "https://example.com/logo.png",
 *   description: "Short description...",
 *   viewLink: "/shelter/1"
 * }
 */

export default function Shelters({
  onSearch,
  initialLocation = "",
  initialName = "",
  shelterData = null,
}) {
  const prefix = "aasra-shelters";

  // sample fallback data (you can replace with props.shelterData)

  const sample = [
  {
    id: 1,
    name: "Mumbai Animal Aid",
    city: "Andheri West, Mumbai, MH",
    pincode: "400053",
    phone: "+91 22 2630 1122",
    logo: "https://placehold.co/120x120/0057b8/ffffff/png?text=MAA",
    description: "Rescue, foster and adoption services across Mumbai.",
    viewLink: "#"
  },
  {
    id: 2,
    name: "Bengaluru Humane Society",
    city: "Jayanagar, Bengaluru, KA",
    pincode: "560041",
    phone: "+91 80 2678 3344",
    logo: "https://placehold.co/120x120/0b6e4f/ffffff/png?text=BHS",
    description: "Community-driven rescue, vaccination and awareness programs.",
    viewLink: "#"
  },
  {
    id: 3,
    name: "Delhi Pets Foundation",
    city: "Lajpat Nagar, New Delhi, DL",
    pincode: "110024",
    phone: "+91 11 2467 8822",
    logo: "https://placehold.co/120x120/c71585/ffffff/png?text=DPF",
    description: "Adoption, medical camps and street animal care in Delhi.",
    viewLink: "#"
  },
  {
    id: 4,
    name: "Kolkata Animal Rescue",
    city: "Gariahat, Kolkata, WB",
    pincode: "700029",
    phone: "+91 33 2456 7788",
    logo: "https://placehold.co/120x120/ff6f00/ffffff/png?text=KAR",
    description: "Shelter and rehabilitation services for Kolkata's animals.",
    viewLink: "#"
  },
  {
    id: 5,
    name: "Chennai Stray Care",
    city: "Adyar, Chennai, TN",
    pincode: "600020",
    phone: "+91 44 2445 9900",
    logo: "https://placehold.co/120x120/1e88e5/ffffff/png?text=CSC",
    description: "Spay/neuter drives and community outreach in Chennai.",
    viewLink: "#"
  },
  {
    id: 6,
    name: "Hyderabad Hope Shelter",
    city: "Banjara Hills, Hyderabad, TS",
    pincode: "500034",
    phone: "+91 40 2356 4411",
    logo: "https://placehold.co/120x120/6b21a8/ffffff/png?text=HHS",
    description: "Long-term care and adoption programs in Hyderabad.",
    viewLink: "#"
  },
  {
    id: 7,
    name: "Pune Paws Rescue",
    city: "Kothrud, Pune, MH",
    pincode: "411038",
    phone: "+91 20 2547 3322",
    logo: "https://placehold.co/120x120/00897b/ffffff/png?text=PPR",
    description: "Foster network and adoption events across Pune.",
    viewLink: "#"
  },
  {
    id: 8,
    name: "Ahmedabad Animal Helpline",
    city: "Navrangpura, Ahmedabad, GJ",
    pincode: "380009",
    phone: "+91 79 2642 1100",
    logo: "https://placehold.co/120x120/f4511e/ffffff/png?text=AAH",
    description: "Emergency rescues, medical aid and rehoming in Ahmedabad.",
    viewLink: "#"
  },
  {
    id: 9,
    name: "Jaipur Street Animal Care",
    city: "Bapu Nagar, Jaipur, RJ",
    pincode: "302015",
    phone: "+91 141 260 7788",
    logo: "https://placehold.co/120x120/7b1fa2/ffffff/png?text=JSAC",
    description: "Street animal feeding, medical camps and shelter support.",
    viewLink: "#"
  },
  {
    id: 10,
    name: "Lucknow Animal Welfare",
    city: "Hazratganj, Lucknow, UP",
    pincode: "226001",
    phone: "+91 522 220 3344",
    logo: "https://placehold.co/120x120/2e7d32/ffffff/png?text=LAW",
    description: "Rescue operations and adoption drives across Lucknow.",
    viewLink: "#"
  },
  {
    id: 11,
    name: "Coimbatore Companion Rescue",
    city: "RS Puram, Coimbatore, TN",
    pincode: "641002",
    phone: "+91 422 249 5566",
    logo: "https://placehold.co/120x120/0288d1/ffffff/png?text=CCR",
    description: "Local shelter focusing on senior and special-needs pets.",
    viewLink: "#"
  },
  {
    id: 12,
    name: "Bhopal Animal Care Trust",
    city: "Arera Colony, Bhopal, MP",
    pincode: "462016",
    phone: "+91 755 276 8899",
    logo: "https://placehold.co/120x120/ff7043/ffffff/png?text=BACT",
    description: "Medical, foster and adoption services for central India.",
    viewLink: "#"
  },
  {
    id: 13,
    name: "Thiruvananthapuram Pet Rescue",
    city: "Thampanoor, Trivandrum, KL",
    pincode: "695001",
    phone: "+91 471 233 4455",
    logo: "https://placehold.co/120x120/00796b/ffffff/png?text=TPR",
    description: "Coastal-region rescues and adoption services in Kerala.",
    viewLink: "#"
  },
  {
    id: 14,
    name: "Chandigarh Animal Support",
    city: "Sector 17, Chandigarh, CH",
    pincode: "160017",
    phone: "+91 172 274 9900",
    logo: "https://placehold.co/120x120/9c27b0/ffffff/png?text=CAS",
    description: "Volunteer-driven rescue and community education programs.",
    viewLink: "#"
  },
  {
    id: 15,
    name: "Guwahati Rescue & Rehome",
    city: "Paltan Bazaar, Guwahati, AS",
    pincode: "781008",
    phone: "+91 361 230 1122",
    logo: "https://placehold.co/120x120/ff5722/ffffff/png?text=GRR",
    description: "Northeast rescue hub offering shelter and adoption services.",
    viewLink: "#"
  }
];


  const data = shelterData && Array.isArray(shelterData) ? shelterData : sample;

  const [location, setLocation] = useState(initialLocation);
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const [filtered, setFiltered] = useState(data);

  // derive resultsCount from filtered length
  const resultsCount = filtered.length;

  // filter function (case-insensitive includes)
  const applyFilter = (loc, nm) => {
    const l = (loc || "").trim().toLowerCase();
    const n = (nm || "").trim().toLowerCase();

    // If both empty, return all
    if (!l && !n) return data;

    return data.filter((s) => {
      const inLocation = l ? (s.city || "").toLowerCase().includes(l) : false;
      const inName = n ? (s.name || "").toLowerCase().includes(n) : false;
      // behave like "location OR name" as the UI suggests
      return (l && inLocation) || (n && inName);
    });
  };

  // init filtered from data
  React.useEffect(() => {
    setFiltered(data);
  }, [JSON.stringify(data)]); // reset if data changes

  const submit = async (e) => {
    e?.preventDefault();
    if (onSearch) {
      try {
        setLoading(true);
        await onSearch({ location: location.trim(), name: name.trim() });
      } catch (err) {
        console.error("Shelters search error:", err);
      } finally {
        setLoading(false);
      }
    }
    // locally filter
    const result = applyFilter(location, name);
    setFiltered(result);
  };

  // quick clear function
  const clearFilters = () => {
    setLocation("");
    setName("");
    setFiltered(data);
  };

  // memoized cards markup
  const cards = useMemo(
    () =>
      filtered.map((s) => (
        <article key={s.id} className={`${prefix}-cardItem`}>
          <div className={`${prefix}-logoWrap`}>
            <img src={s.logo} alt={`${s.name} logo`} className={`${prefix}-logo`} />
          </div>

          <div className={`${prefix}-cardBody`}>
            <h3 className={`${prefix}-cardTitle`}>{s.name}</h3>

            <div className={`${prefix}-metaRow`}>
              <span className={`${prefix}-metaIcon`} aria-hidden>
                🏠
              </span>
              <span className={`${prefix}-metaText`}>{s.city}</span>
            </div>

            <div className={`${prefix}-metaRow`}>
              <span className={`${prefix}-metaIcon`} aria-hidden>
                📞
              </span>
              <span className={`${prefix}-metaText`}>{s.phone}</span>
            </div>

            <p className={`${prefix}-desc`}>{s.description}</p>

            <div className={`${prefix}-cardActions`}>
              <a href={s.viewLink || "#"} className={`${prefix}-btn`} onClick={(e) => { e.preventDefault(); console.log("View pets for", s.name); }}>
                VIEW PETS
              </a>
            </div>
          </div>
        </article>
      )),
    [filtered]
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
          <button type="submit" className={`${prefix}-searchBtn`} aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18" style={{ marginRight: 6 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
            </svg>
            <span>SEARCH</span>
          </button>
        </div>

        <div className={`${prefix}-results`}>
          <span className={`${prefix}-resultsCount`}>{resultsCount}</span> Results
          <button type="button" onClick={clearFilters} style={{ marginLeft: 12, padding: "6px 10px", borderRadius: 8, border: "1px solid #e6e9ef", background: "#fff", cursor: "pointer" }}>
            Clear
          </button>
        </div>
      </form>

      {/* CARDS GRID */}
      <div className={`${prefix}-grid`} role="list">
        {cards}
      </div>
        </section>
    </section>
  );
}
