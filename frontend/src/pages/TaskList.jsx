import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../taskApi';
import { getWeddings } from '../api';

const STATUS_COLORS = {
  'à faire': { bg: '#fef9c3', color: '#854d0e' },
  'en cours': { bg: '#dbeafe', color: '#1e40af' },
  'terminé': { bg: '#dcfce7', color: '#166534' }
};

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [weddings, setWeddings] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('à faire');
  const [weddingId, setWeddingId] = useState('');
  const [editId, setEditId] = useState(null);
  const [filterWedding, setFilterWedding] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    getTasks().then(setTasks);
    getWeddings().then(setWeddings);
  }, []);

  const handleSubmit = async () => {
    if (!title) return;
    const data = { title, description, status, weddingId: weddingId || null };
    if (editId) {
      const updated = await updateTask(editId, data);
      setTasks(tasks.map(t => t._id === editId ? updated : t));
      setEditId(null);
    } else {
      const newTask = await createTask(data);
      setTasks([...tasks, newTask]);
    }
    setTitle(''); setDescription(''); setStatus('à faire'); setWeddingId('');
  };

  const handleEdit = (t) => {
    setEditId(t._id);
    setTitle(t.title);
    setDescription(t.description || '');
    setStatus(t.status);
    setWeddingId(t.weddingId || '');
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const handleStatusChange = async (task, newStatus) => {
    const updated = await updateTask(task._id, { ...task, status: newStatus });
    setTasks(tasks.map(t => t._id === task._id ? updated : t));
  };

  const handleCancel = () => {
    setEditId(null);
    setTitle(''); setDescription(''); setStatus('à faire'); setWeddingId('');
  };

  const getWeddingName = (id) => {
    const w = weddings.find(w => w._id === id);
    return w ? w.name : 'N/A';
  };

  const filtered = tasks.filter(t => {
    if (filterWedding && t.weddingId !== filterWedding) return false;
    if (filterStatus && t.status !== filterStatus) return false;
    return true;
  });

  const countByStatus = (s) => tasks.filter(t => t.status === s).length;

  return (
    <div className="page">
      <h1 className="page-title">Gestion des Tâches</h1>


      {/* Formulaire */}
      <div className="card">
        <h2>{editId ? 'Modifier la tâche' : 'Nouvelle tâche'}</h2>
        <div className="form-group">
          <label>Titre</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex: Réserver le traiteur" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Détails optionnels..." />
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Statut</label>
            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option value="à faire">À faire</option>
              <option value="en cours">En cours</option>
              <option value="terminé">Terminé</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Mariage associé</label>
            <select value={weddingId} onChange={e => setWeddingId(e.target.value)}>
              <option value="">-- Aucun --</option>
              {weddings.map(w => (
                <option key={w._id} value={w._id}>{w.name}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button className="btn-primary" onClick={handleSubmit}>
            {editId ? 'Enregistrer' : 'Ajouter la tâche'}
          </button>
          {editId && (
            <button className="btn-warning" onClick={handleCancel}>Annuler</button>
          )}
        </div>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1rem' }}>
        <select
          value={filterWedding}
          onChange={e => setFilterWedding(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
        >
          <option value="">Tous les mariages</option>
          {weddings.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
        </select>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
        >
          <option value="">Tous les statuts</option>
          <option value="à faire">À faire</option>
          <option value="en cours">En cours</option>
          <option value="terminé">Terminé</option>
        </select>
      </div>

      {/* Liste des tâches */}
      <div className="list-container">
        {filtered.length === 0 && (
          <div className="list-item">
            <span style={{ color: '#9ca3af' }}>Aucune tâche trouvée.</span>
          </div>
        )}
        {filtered.map(t => (
          <div className="list-item" key={t._id}>
            <div className="list-item-left">
              <strong>{t.title}</strong>
              {t.description && <p>{t.description}</p>}
              <p style={{ marginTop: '4px' }}>
                Mariage : {t.weddingId ? getWeddingName(t.weddingId) : 'N/A'}
              </p>
            </div>
            <div className="list-item-right">
              <select
                value={t.status}
                onChange={e => handleStatusChange(t, e.target.value)}
                style={{
                  padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600,
                  border: 'none', cursor: 'pointer',
                  backgroundColor: STATUS_COLORS[t.status].bg,
                  color: STATUS_COLORS[t.status].color
                }}
              >
                <option value="à faire">À faire</option>
                <option value="en cours">En cours</option>
                <option value="terminé">Terminé</option>
              </select>
              <button className="btn-icon" onClick={() => handleEdit(t)}>✏️</button>
              <button className="btn-icon delete" onClick={() => handleDelete(t._id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;