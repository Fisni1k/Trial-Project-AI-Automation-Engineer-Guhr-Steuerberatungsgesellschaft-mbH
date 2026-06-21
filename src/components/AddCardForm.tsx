import { useState } from 'react';
import { ClientCard, MandateType, StatusTag } from '../types';
import { TEAM_MEMBERS } from '../data';

interface AddCardFormProps {
  phaseId: string;
  onAdd: (card: ClientCard) => void;
  onCancel: () => void;
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

export function AddCardForm({ phaseId, onAdd, onCancel }: AddCardFormProps) {
  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mandateType, setMandateType] = useState<MandateType>('Einkommensteuer');
  const [assignedTo, setAssignedTo] = useState(TEAM_MEMBERS[0]);
  const [status, setStatus] = useState<StatusTag>('normal');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !email.trim()) return;

    const newCard: ClientCard = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      clientName: clientName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      mandateType,
      assignedTo,
      dateAdded: new Date().toISOString().split('T')[0],
      status,
      notes: notes.trim(),
      phaseId,
    };

    onAdd(newCard);
  };

  return (
    <form className="add-card-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Mandant Name *"
        value={clientName}
        onChange={(e) => setClientName(e.target.value)}
        required
        autoFocus
      />
      <input
        type="email"
        placeholder="E-Mail *"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Telefon"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <select value={mandateType} onChange={(e) => setMandateType(e.target.value as MandateType)}>
        {MANDATE_TYPES.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
        {TEAM_MEMBERS.map((member) => (
          <option key={member} value={member}>{member}</option>
        ))}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value as StatusTag)}>
        <option value="normal">Normal</option>
        <option value="urgent">Dringend</option>
        <option value="waiting">Wartend</option>
        <option value="vip">VIP</option>
      </select>
      <textarea
        placeholder="Notizen..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={2}
      />
      <div className="add-card-form-actions">
        <button type="submit" className="btn btn-primary btn-sm">
          Hinzufügen
        </button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onCancel}>
          Abbrechen
        </button>
      </div>
    </form>
  );
}