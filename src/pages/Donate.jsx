import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const TIERS = [250, 500, 1000, 2500, 5000, 10000];

const ImpactLine = ({ icon, text }) => (
  <li className="d-flex align-items-start gap-2 mb-2">
    <span className="badge bg-teal rounded-pill me-1" style={{ minWidth: 28 }}>
      {icon}
    </span>
    <span className="text-muted small">{text}</span>
  </li>
);

const AmountPill = ({ value, selected, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(value)}
    className={`btn ${selected ? "btn-teal" : "btn-outline-secondary"} rounded-pill px-3 py-2`}
    aria-pressed={selected}
  >
    ₹ {value.toLocaleString("en-IN")}
  </button>
);

export default function DonatePage() {
  const [isMonthly, setIsMonthly] = useState(true);
  const [amount, setAmount] = useState(1000);
  const [selectedTier, setSelectedTier] = useState(1000);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [isAnon, setIsAnon] = useState(false);
  const [agree, setAgree] = useState(true);

  const minAmount = 100; // adjust to your gateway minimum

  const impact = useMemo(() => {
    // Very rough examples; replace with your real costs
    const base = amount || 0;
    const meals = Math.floor(base / 150);
    const vaccines = Math.floor(base / 500);
    const rehabDays = Math.floor(base / 350);
    return { meals, vaccines, rehabDays };
  }, [amount]);

  const onSelectTier = (v) => {
    setSelectedTier(v);
    setAmount(v);
  };

  const onAmountChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const val = raw ? parseInt(raw, 10) : 0;
    setAmount(val);
    setSelectedTier(TIERS.includes(val) ? val : null);
  };

  const isValid = amount >= minAmount && agree;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    // Hook this up to your gateway (Stripe/Razorpay/PayPal/UPI etc.)
    // For now we just demonstrate payload structure
    const payload = {
      amount,
      currency: "INR",
      recurring: isMonthly,
      donor: { name: isAnon ? "Anonymous" : name, email },
      note,
      meta: { source: "donate-page" },
    };
    console.log("Donate payload:", payload);
    alert(`Thanks${name ? ", " + name : ""}! We\n` +
      `${isMonthly ? "will create a monthly" : "will process your one‑time"} donation of ₹${amount.toLocaleString("en-IN")}\n` +
      `Next step: connect this button to your payment gateway.`);
  };

  return (
    <main className="bg-light">
      {/* Hero */}
      {/* <section className="position-relative overflow-hidden">
        <div className="container py-5"> */}
        <section className="position-relative overflow-hidden pb-0">
         <div className="container pt-4 pt-md-5 pb-0">
          <div className="row align-items-center g-4 py-2">
            <div className="col-lg-6">
              {/* Hero image */}
              <img
            src="/assets/images/animals/Please-Donate.jpg"   // or .jpeg – match your file exactly
            alt="Donate — save a life today"
            className="img-fluid rounded-4 shadow-sm mb-4 w-100"
            style={{ objectFit: "cover", maxHeight: "320px" }}
            />

              <span className="badge bg-teal mb-3">Every rupee makes a tail wag</span>
              <h1 className="display-5 fw-bold mb-3">Donate to Save &amp; Rehome Animals</h1>
              <p className="lead text-muted mb-4">
                Your support funds rescue missions, medical care, vaccinations, and safe shelter for dogs, cats and small animals.
              </p>
              <ul className="list-unstyled mb-4">
                <ImpactLine icon="🐾" text="100% used for animal care & rescue operations" />
                <ImpactLine icon="🧾" text="Instant receipt & annual donation report via email" />
                <ImpactLine icon="🔒" text="Secure payments • Cancel monthly anytime" />
              </ul>
              <a href="#donate" className="btn btn-teal btn-lg px-4">Donate now</a>
            </div>
            <div className="col-lg-6">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4 p-md-5">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="m-0">Choose your impact</h5>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="freqSwitch"
                        checked={isMonthly}
                        onChange={() => setIsMonthly(!isMonthly)}
                        aria-label="Toggle monthly giving"
                      />
                      <label className="form-check-label ms-2" htmlFor="freqSwitch">
                        {isMonthly ? "Monthly" : "One‑time"}
                      </label>
                    </div>
                  </div>

                  {/* Preset amounts */}
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {TIERS.map((t) => (
                      <AmountPill key={t} value={t} selected={selectedTier === t} onClick={onSelectTier} />
                    ))}
                  </div>

                  {/* Custom amount */}
                  <div className="input-group input-group-lg mb-2" id="donate">
                    <span className="input-group-text">₹</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="form-control"
                      placeholder="Enter amount"
                      value={amount ? amount.toString() : ""}
                      onChange={onAmountChange}
                      aria-label="Donation amount in rupees"
                    />
                  </div>
                  <div className="form-text mb-3">
                    Minimum ₹{minAmount.toLocaleString("en-IN")} • {isMonthly ? "Billed every month" : "One‑time gift"}
                  </div>

                  {/* Live impact meter */}
                  <div className="bg-light rounded-3 p-3 mb-3">
                    <div className="small text-muted mb-2">Your gift can provide:</div>
                    <div className="d-flex flex-wrap gap-3">
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-secondary">🍛</span>
                        <span className="small">{impact.meals} warm meals</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-secondary">💉</span>
                        <span className="small">{impact.vaccines} vaccinations</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-secondary">🏥</span>
                        <span className="small">{impact.rehabDays} days of care</span>
                      </div>
                    </div>
                  </div>

                  {/* Donor info (minimal) */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Optional if anonymous"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isAnon}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email for receipt</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Leave a message (optional)</label>
                      <textarea className="form-control" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-between">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="anon" checked={isAnon} onChange={() => setIsAnon(!isAnon)} />
                        <label className="form-check-label" htmlFor="anon">Give anonymously</label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="agree" checked={agree} onChange={() => setAgree(!agree)} />
                        <label className="form-check-label" htmlFor="agree">I agree to the terms</label>
                      </div>
                    </div>
                  </div>

                  {/* Payment methods (placeholder) */}
                  <div className="mt-4">
                    <div className="small text-muted mb-2">Choose a payment method</div>
                    <div className="d-flex flex-wrap gap-2">
                      <button type="button" className="btn btn-outline-dark">
                        💳 Card
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        🏦 Net Banking
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        📱 UPI
                      </button>
                      <button type="button" className="btn btn-outline-dark">
                        🌐 PayPal
                      </button>
                    </div>
                  </div>

                  <div className="d-grid mt-4">
                    <button
                      className="btn btn-teal btn-lg"
                      onClick={handleSubmit}
                      disabled={!isValid}
                    >
                      {isMonthly ? "Start Monthly Support" : "Donate Now"} — ₹{(amount || 0).toLocaleString("en-IN")}
                    </button>
                    {!isValid && (
                      <div className="form-text text-danger mt-2">
                        Enter at least ₹{minAmount.toLocaleString("en-IN")} and accept the terms.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative wave divider */}
        <svg
        viewBox="0 0 1440 120"
        className="position-absolute bottom-0 start-0 w-100"
        style={{ height: 60 }}
         >
        <path fill="#f8f9fa" d="..."/>
        </svg>

      </section>

      {/* Proof / Transparency */}
      <section className="bg-white py-3 pb-0">
        <div className="container">
          <div className="row g-4 align-items-center mt-0 pt-0">
            <div className="col-lg-5">
              <h2 className="fw-bold mb-3">Where your money goes</h2>
              <p className="text-muted">We keep admin costs lean so your gift directly powers rescue, food, medical care and adoptions.</p>
              <ul className="list-unstyled small text-muted">
                <li className="mb-2">🐕 45% — Rescue & rehabilitation</li>
                <li className="mb-2">🩺 30% — Medical care & vaccinations</li>
                <li className="mb-2">🍲 15% — Food & supplies</li>
                <li>🏠 10% — Shelter operations</li>
              </ul>
            </div>
            <div className="col-lg-7">
              <div className="row g-3">
                {[
                  { title: "Tax‑deductible", text: "Receive an official receipt for your records." },
                  { title: "Secure payments", text: "Industry‑standard encryption & trusted gateways." },
                  { title: "Cancel anytime", text: "Manage monthly donations in one click." },
                  { title: "Impact updates", text: "Get stories and photos of animals you helped." },
                ].map((c, i) => (
                  <div className="col-6" key={i}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h6 className="fw-bold mb-1">{c.title}</h6>
                        <p className="text-muted small mb-0">{c.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="fw-bold">Kind words from donors</h2>
            <p className="text-muted">Real impact, real tails wagging.</p>
          </div>
          <div className="row g-4">
            {[ 
              {name: "Aanya R.", quote: "I love the monthly option—seeing updates of the dogs I helped makes my day!"},
              {name: "Karthik V.", quote: "Transparent, quick receipt, and amazing rescue stories. Highly recommend donating."},
              {name: "Meera S.", quote: "Knowing my gift vaccinated 6 pups this month feels incredible."}
            ].map((t, i) => (
              <div className="col-md-4" key={i}>
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <p className="mb-3">“{t.quote}”</p>
                    <div className="d-flex align-items-center gap-2">
                      <div className="rounded-circle bg-secondary" style={{ width: 36, height: 36, opacity: .25 }} />
                      <strong className="small">{t.name}</strong>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h2 className="fw-bold mb-4 text-center">Frequently asked questions</h2>
              <div className="accordion" id="faq">
                {[
                  { q: "Is my donation tax‑deductible?", a: "Yes. You'll receive an instant receipt for your records. Check local laws for specific benefits." },
                  { q: "How do I cancel a monthly donation?", a: "You can cancel anytime via the link in your donation emails or by contacting our support." },
                  { q: "Can I donate supplies instead?", a: "Absolutely! We gratefully accept food, medicines, bedding and toys at our shelter." },
                ].map((f, i) => (
                  <div className="accordion-item" key={i}>
                    <h2 className="accordion-header" id={`h${i}`}>
                      <button className={`accordion-button ${i !== 0 ? "collapsed" : ""}`} type="button" data-bs-toggle="collapse" data-bs-target={`#c${i}`} aria-expanded={i === 0} aria-controls={`c${i}`}>
                        {f.q}
                      </button>
                    </h2>
                    <div id={`c${i}`} className={`accordion-collapse collapse ${i === 0 ? "show" : ""}`} data-bs-parent="#faq">
                      <div className="accordion-body text-muted">{f.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Ready to change a life today?</h2>
          <p className="text-muted mb-4">Join hundreds of kind humans giving animals a second chance.</p>
          <a href="#donate" className="btn btn-teal btn-lg px-4">Donate now</a>
        
        </div>
      </section>
    </main>
  );
}
