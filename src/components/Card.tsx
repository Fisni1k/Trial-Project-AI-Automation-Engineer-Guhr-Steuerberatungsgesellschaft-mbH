import { useCallback } from 'react';
import { ClientCard, StatusTag } from '../types';

interface CardProps {
  card: ClientCard;
  onClick: (card: ClientCard) => void;
}

const STATUS_CONFIG: Record<StatusTag, { label: string; className: string }> = {
  urgent: { label: 'Dringend', className: 'status-urgent' },
  normal: { label: 'Normal', className: 'status-normal' },
  waiting: { label: 'Wartend', className: 'status-waiting' },
  vip: { label: 'VIP', className: 'status-vip' },
};

export function Card({ card, onClick }: CardProps) {
  const statusInfo = STATUS_CONFIG[card.status];

  const handleDragStart = useCallback(
    (e: React.DragEvent) => {
      e.dataTransfer.setData('text/plain', card.id);
      e.dataTransfer.effectAllowed = 'move';
      const target = e.currentTarget as HTMLElement;
      target.classList.add('card--dragging');
    },
    [card.id]
  );

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    const target = e.currentTarget as HTMLElement;
    target.classList.remove('card--dragging');
  }, []);

  return (
    <div
      className="card"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => onClick(card)}
    >
      <div className="card-top">
        <span className={`card-status ${statusInfo.className}`}>
          {statusInfo.label}
        </span>
        <span className="card-mandate-type">{card.mandateType}</span>
      </div>

      <h3 className="card-client-name">{card.clientName}</h3>

      <div className="card-details">
        <div className="card-detail">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 3l4 3 4-3M2 3h8v6H2V3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>{card.email}</span>
        </div>
        <div className="card-detail">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2a1 1 0 011-1h1.5a1 1 0 01.9.6l.5 1a1 1 0 01-.2 1.1l-.7.7a5 5 0 002.6 2.6l.7-.7a1 1 0 011.1-.2l1 .5a1 1 0 01.6.9V9a1 1 0 01-1 1H9a7 7 0 01-7-7V2z" stroke="currentColor" strokeWidth="1.2"/>
          </svg>
          <span>{card.phone}</span>
        </div>
      </div>

      <div className="card-footer">
        <div className="card-assigned">
          <div className="card-avatar">
            {card.assignedTo.split(' ').map((n) => n[0]).join('')}
          </div>
          <span>{card.assignedTo}</span>
        </div>
        <span className="card-date">
          {new Date(card.dateAdded).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
          })}
        </span>
      </div>

      {card.notes && (
        <p className="card-notes">{card.notes.length > 60 ? card.notes.substring(0, 60) + '...' : card.notes}</p>
      )}
    </div>
  );
}