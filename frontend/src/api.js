const BASE_URL = 'http://localhost:5000/api';

// ─── WEDDINGS ───────────────────────────────────────────
export const getWeddings = () => fetch(`${BASE_URL}/weddings`).then(r => r.json());
export const createWedding = (data) => fetch(`${BASE_URL}/weddings`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteWedding = (id) => fetch(`${BASE_URL}/weddings/${id}`, { method: 'DELETE' }).then(r => r.json());

// ─── GUESTS ─────────────────────────────────────────────
export const getGuests = () => fetch(`${BASE_URL}/guests`).then(r => r.json());
export const createGuest = (data) => fetch(`${BASE_URL}/guests`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const updateGuest = (id, data) => fetch(`${BASE_URL}/guests/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteGuest = (id) => fetch(`${BASE_URL}/guests/${id}`, { method: 'DELETE' }).then(r => r.json());

// ─── VENDORS ────────────────────────────────────────────
export const getVendors = () => fetch(`${BASE_URL}/vendors`).then(r => r.json());
export const createVendor = (data) => fetch(`${BASE_URL}/vendors`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const updateVendor = (id, data) => fetch(`${BASE_URL}/vendors/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteVendor = (id) => fetch(`${BASE_URL}/vendors/${id}`, { method: 'DELETE' }).then(r => r.json());

// ─── BUDGETS ────────────────────────────────────────────
export const getBudgets = () => fetch(`${BASE_URL}/budgets`).then(r => r.json());
export const createBudget = (data) => fetch(`${BASE_URL}/budgets`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(r => r.json());
export const deleteBudget = (id) => fetch(`${BASE_URL}/budgets/${id}`, { method: 'DELETE' }).then(r => r.json());