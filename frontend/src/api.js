// src/services/api.js

const BASE_URL = 'http://localhost:5000/api';

// ─── Helper pour faire toutes les requêtes avec JWT ───────────────
const fetchWithAuth = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token'); // Récupère le token
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    ...options.headers
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erreur ${res.status}: ${errorText}`);
  }
  return res.json();
};

// ─── WEDDINGS ───────────────────────────────────────────
export const getWeddings = () => fetchWithAuth('/weddings');
export const createWedding = (data) => fetchWithAuth('/weddings', { method: 'POST', body: JSON.stringify(data) });
export const updateWedding = (id, data) => fetchWithAuth(`/weddings/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteWedding = (id) => fetchWithAuth(`/weddings/${id}`, { method: 'DELETE' });

// ─── GUESTS ─────────────────────────────────────────────
export const getGuests = () => fetchWithAuth('/guests');
export const createGuest = (data) => fetchWithAuth('/guests', { method: 'POST', body: JSON.stringify(data) });
export const updateGuest = (id, data) => fetchWithAuth(`/guests/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteGuest = (id) => fetchWithAuth(`/guests/${id}`, { method: 'DELETE' });

// ─── VENDORS ────────────────────────────────────────────
export const getVendors = () => fetchWithAuth('/vendors');
export const createVendor = (data) => fetchWithAuth('/vendors', { method: 'POST', body: JSON.stringify(data) });
export const updateVendor = (id, data) => fetchWithAuth(`/vendors/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteVendor = (id) => fetchWithAuth(`/vendors/${id}`, { method: 'DELETE' });

// ─── BUDGETS ────────────────────────────────────────────
export const getBudgets = () => fetchWithAuth('/budgets');
export const createBudget = (data) => fetchWithAuth('/budgets', { method: 'POST', body: JSON.stringify(data) });
export const deleteBudget = (id) => fetchWithAuth(`/budgets/${id}`, { method: 'DELETE' });