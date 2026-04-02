import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const BASE_URL = 'http://localhost:5000/api';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message);
      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Connexion</h2>
        {error && <p className="auth-error">{error}</p>}
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="votre@email.com" />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <button className="btn-primary" style={{width:'100%', marginTop:'0.5rem'}} onClick={handleLogin}>
          Se connecter
        </button>
        <p className="auth-switch">Pas encore de compte ? <Link to="/signup">S'inscrire</Link></p>
      </div>
    </div>
  );
}

export default Login;