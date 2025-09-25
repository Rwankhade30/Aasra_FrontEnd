import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import AnimalDetails from "./pages/AnimalDetails";
import AdoptionsPage from "./pages/AdoptionsPage";
import RescuePage from "./pages/RescuePage"; // ✅ Corrected import
import RescueForm from "./components/rescue/RescueForm"; // adjust path if needed

import Donate from "./pages/Donate";
import AdoptionForm from "./components/adoption/AdoptionForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animal/:id" element={<AnimalDetails />} />
        <Route path="/adoptions" element={<AdoptionsPage />} />
        <Route path="/rescues" element={<RescuePage />} />
        <Route path="/donate" element={<Donate />} />
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
        <Route path="/rescues/new" element={<RescueForm />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
