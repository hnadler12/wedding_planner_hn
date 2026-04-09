import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Wedding Planner</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Accueil</Link>
        <Link to="/weddings">Weddings</Link>
        <Link to="/guests">Invités</Link>
        <Link to="/vendors">Prestataires</Link>
        <Link to="/budgets">Budget</Link>
        <Link to="/tasks">Tâches</Link>

        {user ? (
          <>
            <span style={{ color: 'white', fontSize: '0.9rem' }}>Connecté : {user.name}</span>
            <button className="btn-deconnexion" onClick={handleLogout}>Déconnexion</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;