import React, { useState, useEffect } from "react";
import { getGuests, createGuest, updateGuest, deleteGuest } from "../api";
import { getWeddings } from "../api";

function Guests() {
  const [guests, setGuests] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("invité");
  const [rsvp, setRsvp] = useState(false);
  const [weddingId, setWeddingId] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getGuests().then(setGuests);
    getWeddings().then(setWeddings);
  }, []);

  const handleAdd = async () => {
    if (!name) return;
    const data = { name, email, status, rsvp, weddingId: weddingId || null };
    if (editId) {
      const updated = await updateGuest(editId, data);
      setGuests(guests.map(g => g._id === editId ? updated : g));
      setEditId(null);
    } else {
      const newGuest = await createGuest(data);
      setGuests([...guests, newGuest]);
    }
    setName(""); setEmail(""); setStatus("invité"); setRsvp(false); setWeddingId("");
  };

  const handleEdit = (g) => {
    setEditId(g._id);
    setName(g.name);
    setEmail(g.email || "");
    setStatus(g.status);
    setRsvp(g.rsvp);
    setWeddingId(g.weddingId || "");
  };

  const handleDelete = async (id) => {
    await deleteGuest(id);
    setGuests(guests.filter(g => g._id !== id));
  };

  const getWeddingName = (id) => {
    const w = weddings.find(w => w._id === id);
    return w ? w.name : "";
  };

  return (
    <div className="page">
      <h1 className="page-title">Liste des Invités</h1>

      <div className="form-inline">
        <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="invité">Statut</option>
          <option value="invité">invité</option>
          <option value="confirmé">confirmé</option>
          <option value="annulé">annulé</option>
        </select>
        <select value={weddingId} onChange={e => setWeddingId(e.target.value)}>
          <option value="">Mariage</option>
          {weddings.map(w => (
            <option key={w._id} value={w._id}>{w.name}</option>
          ))}
        </select>
        <label className="checkbox-label">
          <input type="checkbox" checked={rsvp} onChange={e => setRsvp(e.target.checked)} />
          RSVP
        </label>
        <button className="btn-primary" onClick={handleAdd}>
          {editId ? "Modifier" : "Ajouter"}
        </button>
      </div>

      <div className="list-container">
        {guests.length === 0 && (
          <div className="list-item"><span style={{color:'#9ca3af'}}>Aucun invité enregistré.</span></div>
        )}
        {guests.map(g => (
          <div className="list-item" key={g._id}>
            <div className="list-item-left">
              <strong>{g.name}</strong> ({g.email || ""})
              <p>Statut: {g.status} | RSVP: {g.rsvp ? "Oui" : "Non"}</p>
              <p>Mariage: {g.weddingId ? getWeddingName(g.weddingId) : ""}</p>
            </div>
            <div className="list-item-right">
              <button className="btn-icon" onClick={() => handleEdit(g)}>✏️</button>
              <button className="btn-icon delete" onClick={() => handleDelete(g._id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guests;