import React, { useState, useEffect } from "react";
import { getWeddings, createWedding, deleteWedding } from "../api";

function Weddings() {
  const [weddings, setWeddings] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    getWeddings().then(setWeddings);
  }, []);

  const handleCreate = async () => {
    if (!name || !date || !location) return;
    const newWedding = await createWedding({ name, date, location });
    setWeddings([...weddings, newWedding]);
    setName(""); setDate(""); setLocation("");
  };

  const handleDelete = async (id) => {
    await deleteWedding(id);
    setWeddings(weddings.filter(w => w._id !== id));
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('fr-BE');

  return (
    <div className="page">
      <h1 className="page-title">Liste des Mariages</h1>

      <div className="card">
        <h2>Créer un mariage</h2>
        <div className="form-group">
          <label>Nom du mariage</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Mariage de Marie et Jean" />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Lieu du mariage</label>
          <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Ex: Bruxelles, Belgique" />
        </div>
        <button className="btn-green" onClick={handleCreate}>⊕ Créer le mariage</button>
      </div>

      <div className="list-container">
        {weddings.length === 0 && (
          <div className="list-item"><span style={{color:'#9ca3af'}}>Aucun mariage enregistré.</span></div>
        )}
        {weddings.map(w => (
          <div className="list-item" key={w._id}>
            <div className="list-item-left">
              <strong>{w.name}</strong> — {formatDate(w.date)}
            </div>
            <div className="list-item-right">
              <span>{w.location}</span>
              <button className="btn-icon delete" onClick={() => handleDelete(w._id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weddings;