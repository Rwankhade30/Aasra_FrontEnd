// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

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
import DonatePage from "./pages/Donate";

import Register from "./pages/Register";
import Login from "./pages/Login";

import { AuthProvider, useAuth } from "./context/AuthContext";

// Simple protected wrapper: shows children only if authed, else redirects to /rescues
function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) return null; // or a spinner/skeleton while checking session
  if (!user) return <Navigate to="/rescues" replace state={{ from: location }} />;

  return children;
}

// Optional: root route that sends logged-out users to /rescues automatically
function RootRoute() {
  const { user, ready } = useAuth();
  if (!ready) return null;
  return user ? <Home /> : <Navigate to="/rescues" replace />;
}

// Optional protected demo page
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
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* Public-only when logged out */}
          <Route path="/rescues" element={<RescuePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Root: send logged-out users to /rescues */}
          <Route path="/" element={<RootRoute />} />

          {/* Everything below requires auth */}
          <Route
            path="/animal/:id"
            element={
              <RequireAuth>
                <AnimalDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/adoptions"
            element={
              <RequireAuth>
                <AdoptionsPage />
              </RequireAuth>
            }
          />
          <Route
            path="/adoption-form"
            element={
              <RequireAuth>
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
              </RequireAuth>
            }
          />
          <Route
            path="/rescues/new"
            element={
                <RescueForm />
            }
          />
          <Route
            path="/rescues/viewstories"
            element={
                <RescueList />
            }
          />
          <Route
            path="/success-stories"
            element={
                <SuccessStoriesPage />
            }
          />
          <Route
            path="/shelters"
            element={
              <RequireAuth>
                <Shelter />
              </RequireAuth>
            }
          />
          <Route
            path="/donate"
            element={
              <RequireAuth>
                <DonatePage />
              </RequireAuth>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          {/* Donation success (protected as well; make public if you prefer) */}
          <Route
            path="/donation-success"
            element={
              <RequireAuth>
                <div className="container py-5">
                  <h2>Thank you! ❤️</h2>
                  <p>We’ve recorded your donation.</p>
                </div>
              </RequireAuth>
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
    </AuthProvider>
  );
}

export default App;
