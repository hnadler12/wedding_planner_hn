import React, { useState, useEffect } from "react";
import { getVendors, createVendor, updateVendor, deleteVendor, getWeddings } from "../api";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [weddingId, setWeddingId] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getVendors().then(setVendors);
    getWeddings().then(setWeddings);
  }, []);

  const handleAdd = async () => {
    if (!name || !type) return;
    const data = { name, type, contact, weddingId: weddingId || null };
    if (editId) {
      const updated = await updateVendor(editId, data);
      setVendors(vendors.map(v => v._id === editId ? updated : v));
      setEditId(null);
    } else {
      const newVendor = await createVendor(data);
      setVendors([...vendors, newVendor]);
    }
    setName(""); setType(""); setContact(""); setWeddingId("");
  };

  const handleEdit = (v) => {
    setEditId(v._id);
    setName(v.name);
    setType(v.type);
    setContact(v.contact || "");
    setWeddingId(v.weddingId || "");
  };

  const handleDelete = async (id) => {
    await deleteVendor(id);
    setVendors(vendors.filter(v => v._id !== id));
  };

  const getWeddingName = (id) => {
    const w = weddings.find(w => w._id === id);
    return w ? `${w.name} (ID: ${w._id})` : "N/A";
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('fr-BE');

  return (
    <div className="page">
      <h1 className="page-title">Liste des Prestataires</h1>

      <div className="card" style={{marginBottom:'1.5rem'}}>
        <div className="form-group">
          <label>Nom du prestataire</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Type de prestataire</label>
          <input value={type} onChange={e => setType(e.target.value)} placeholder="Ex: Décor, Traiteur..." />
        </div>
        <div className="form-group">
          <label>Contact</label>
          <input value={contact} onChange={e => setContact(e.target.value)} placeholder="Email ou téléphone" />
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
        <button className="btn-primary" onClick={handleAdd}>
          {editId ? "✏️ Modifier" : "Ajouter prestataire"}
        </button>
      </div>

      <div className="list-container">
        {vendors.length === 0 && (
          <div className="list-item"><span style={{color:'#9ca3af'}}>Aucun prestataire enregistré.</span></div>
        )}
        {vendors.map(v => (
          <div className="list-item" key={v._id}>
            <div className="list-item-left">
              <strong>{v.name}</strong> ({v.type})
              <p>Contact: {v.contact || "N/A"}</p>
              <p>Mariage: {v.weddingId ? getWeddingName(v.weddingId) : "N/A"}</p>
            </div>
            <div className="list-item-right">
              <button className="btn-warning" onClick={() => handleEdit(v)}>Modifier</button>
              <button className="btn-danger" onClick={() => handleDelete(v._id)}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vendors;