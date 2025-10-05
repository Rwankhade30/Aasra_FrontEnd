// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./pages/Home";
import AnimalDetails from "./pages/AnimalDetails";
import AdoptionsPage from "./pages/AdoptionsPage";
import RescuePage from "./pages/RescuePage";
import RescueForm from "./components/rescue/RescueForm";
import AdoptionForm from "./components/adoption/AdoptionForm";
import RescueList from "./pages/RescueStories";
import SuccessStoriesPage from "./pages/SuccessStoriesPage";
import Shelter from "./pages/Shelter";
import DonatePage from "./pages/Donate"; // keep ONE donate page

import Register from "./pages/Register";
import Login from "./pages/Login";

// Optional: a simple dashboard placeholder (replace with your protected dashboard)
function Dashboard() {
  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "40px auto" }}>
      <h2>Dashboard</h2>
      <p>This is a placeholder protected page. Replace with your actual dashboard.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Animals */}
        <Route path="/animal/:id" element={<AnimalDetails />} />
        <Route path="/adoptions" element={<AdoptionsPage />} />
        <Route
          path="/adoption-form"
          element={
            <AdoptionForm
              user={{
                full_name: "Prathamesh Gatfane",
                email: "you@example.com",
                phone_number: "1234567890",
                address: "Pune, India",
              }}
              animalName="Milo"
              onSubmitSuccess={() => console.log("Success!")}
            />
          }
        />

        {/* Rescues */}
        <Route path="/rescues" element={<RescuePage />} />
        <Route path="/rescues/new" element={<RescueForm />} />
        <Route path="/rescues/viewstories" element={<RescueList />} />

        {/* ✅ Success Stories (expanded list) */}
        <Route path="/success-stories" element={<SuccessStoriesPage />} />

        {/* Shelters */}
        <Route path="/shelters" element={<Shelter />} />

        {/* Donate (single route) */}
        <Route path="/donate" element={<DonatePage />} />

        {/* Auth */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Example protected route placeholder */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Donation success */}
        <Route
          path="/donation-success"
          element={
            <div className="container py-5">
              <h2>Thank you! ❤️</h2>
              <p>We’ve recorded your donation.</p>
            </div>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="container py-5">
              <h2>Not Found</h2>
              <p>The page you’re looking for doesn’t exist.</p>
            </div>
          }
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
