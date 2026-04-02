import React, { useState, useEffect } from "react";
import { getBudgets, createBudget, deleteBudget, getVendors, getWeddings } from "../api";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [amount, setAmount] = useState("");
  const [title, setTitle] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [weddingId, setWeddingId] = useState("");

  useEffect(() => {
    getBudgets().then(setBudgets);
    getVendors().then(setVendors);
    getWeddings().then(setWeddings);
  }, []);

  const handleAdd = async () => {
    if (!title || !amount) return;
    const data = { title, amount: parseFloat(amount), vendorId: vendorId || null, weddingId: weddingId || null };
    const newBudget = await createBudget(data);
    setBudgets([...budgets, newBudget]);
    setTitle(""); setAmount(""); setVendorId(""); setWeddingId("");
  };

  const handleDelete = async (id) => {
    await deleteBudget(id);
    setBudgets(budgets.filter(b => b._id !== id));
  };

  const getVendorName = (id) => {
    const v = vendors.find(v => v._id === id);
    return v ? `${v.name} (${v.type})` : "N/A";
  };

  const getWeddingName = (id) => {
    const w = weddings.find(w => w._id === id);
    return w ? w.name : "N/A";
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('fr-BE');

  return (
    <div className="page">
      <h1 className="page-title">Liste des Budgets</h1>

      <div className="card">
        <div className="form-group">
          <label>Montant (€)</label>
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Ex: 1500" />
        </div>
        <div className="form-group">
          <label>Titre</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Fleurs et décor" />
        </div>
        <div className="form-group">
          <label>Prestataire</label>
          <select value={vendorId} onChange={e => setVendorId(e.target.value)}>
            <option value="">-- Sélectionner un prestataire --</option>
            {vendors.map(v => (
              <option key={v._id} value={v._id}>{v.name} ({v.type})</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Mariage associé</label>
          <select value={weddingId} onChange={e => setWeddingId(e.target.value)}>
            <option value="">-- Sélectionner un mariage --</option>
            {weddings.map(w => (
              <option key={w._id} value={w._id}>{w.name} — {formatDate(w.date)}</option>
            ))}
          </select>
        </div>
        <button className="btn-primary" onClick={handleAdd}>Ajouter Budget</button>
      </div>

      <div className="list-container">
        {budgets.length === 0 && (
          <div className="list-item"><span style={{color:'#9ca3af'}}>Aucun budget enregistré.</span></div>
        )}
        {budgets.map(b => (
          <div className="list-item" key={b._id}>
            <div className="list-item-left">
              <strong>{b.title}</strong> — {parseFloat(b.amount).toFixed(2)} €
            </div>
            <div className="list-item-right">
              <span>Prestataire: {b.vendorId ? getVendorName(b.vendorId) : "N/A"} | Mariage: {b.weddingId ? getWeddingName(b.weddingId) : "N/A"}</span>
              <button className="btn-icon delete" onClick={() => handleDelete(b._id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Budget;