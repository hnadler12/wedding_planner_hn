import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Weddings from "./pages/Weddings";
import Guests from "./pages/Guests";
import Vendors from "./pages/Vendors";
import Budget from "./pages/Budget";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Pages publiques */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Pages protégées */}
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/weddings" element={<PrivateRoute><Weddings /></PrivateRoute>} />
          <Route path="/guests" element={<PrivateRoute><Guests /></PrivateRoute>} />
          <Route path="/vendors" element={<PrivateRoute><Vendors /></PrivateRoute>} />
          <Route path="/budgets" element={<PrivateRoute><Budget /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;