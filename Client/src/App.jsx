import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageHero from "./pages/admin/ManageHero";
import ManageAbout from "./pages/admin/ManageAbout";
import ManageServices from "./pages/admin/ManageServices";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageContact from "./pages/admin/ManageContact";
import ManageSettings from "./pages/admin/ManageSettings";

function App() {
  return (
    <>
      <Routes>
        {/* USER ROUTES  */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ADMIN LOGIN  */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes  */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* ADMIN ROUTES  */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hero" element={<ManageHero />} />
          <Route path="about" element={<ManageAbout />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="contact" element={<ManageContact />} />
          <Route path="settings" element={<ManageSettings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
