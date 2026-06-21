import { useState } from 'react';
import { ClientCard, MandateType, StatusTag } from '../types';
import { PHASES, TEAM_MEMBERS } from '../data';

interface CardModalProps {
  card: ClientCard;
  onClose: () => void;
  onUpdate: (card: ClientCard) => void;
  onDelete: (cardId: string) => void;
}

const MANDATE_TYPES: MandateType[] = [
  'Einkommensteuer',
  'GmbH',
  'Freelancer',
  'UG',
  'Verein',
  'Erbschaftsteuer',
  'Lohnbuchhaltung',
  'Jahresabschluss',
];

const STATUS_OPTIONS: { value: StatusTag; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgent', label: 'Dringend' },
  { value: 'waiting', label: 'Wartend' },
  { value: 'vip', label: 'VIP' },
];

export function CardModal({ card, onClose, onUpdate, onDelete }: CardModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<ClientCard>(card);

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(card);
    setIsEditing(false);
  };

  const currentPhase = PHASES.find((p) => p.id === card.phaseId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">{card.clientName}</h2>
            <span className="modal-phase">{currentPhase?.title}</span>
          </div>
          <div className="modal-header-actions">
            {!isEditing && (
              <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>
                Bearbeiten
              </button>
            )}
            <button className="modal-close" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="modal-body">
          {isEditing ? (
            <div className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Mandant</label>
                  <input
                    type="text"
                    value={editData.clientName}
                    onChange={(e) => setEditData({ ...editData, clientName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Mandatsart</label>
                  <select
                    value={editData.mandateType}
                    onChange={(e) => setEditData({ ...editData, mandateType: e.target.value as MandateType })}
                  >
                    {MANDATE_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>E-Mail</label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Telefon</label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Zuständig</label>
                  <select
                    value={editData.assignedTo}
                    onChange={(e) => setEditData({ ...editData, assignedTo: e.target.value })}
                  >
                    {TEAM_MEMBERS.map((member) => (
                      <option key={member} value={member}>{member}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({ ...editData, status: e.target.value as StatusTag })}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phase</label>
                  <select
                    value={editData.phaseId}
                    onChange={(e) => setEditData({ ...editData, phaseId: e.target.value })}
                  >
                    {PHASES.map((phase) => (
                      <option key={phase.id} value={phase.id}>{phase.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Notizen / Nächste Schritte</label>
                <textarea
                  value={editData.notes}
                  onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="form-actions">
                <button className="btn btn-primary" onClick={handleSave}>
                  Speichern
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Abbrechen
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => onDelete(card.id)}
                >
                  Löschen
                </button>
              </div>
            </div>
          ) : (
            <div className="modal-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">E-Mail</span>
                  <span className="detail-value">{card.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Telefon</span>
                  <span className="detail-value">{card.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Mandatsart</span>
                  <span className="detail-value">{card.mandateType}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Zuständig</span>
                  <span className="detail-value">{card.assignedTo}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Hinzugefügt am</span>
                  <span className="detail-value">
                    {new Date(card.dateAdded).toLocaleDateString('de-DE', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status</span>
                  <span className={`detail-value status-badge status-badge--${card.status}`}>
                    {STATUS_OPTIONS.find((o) => o.value === card.status)?.label}
                  </span>
                </div>
              </div>

              {card.notes && (
                <div className="detail-notes">
                  <span className="detail-label">Notizen / Nächste Schritte</span>
                  <p className="detail-notes-text">{card.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}