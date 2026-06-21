import { useState, useCallback } from 'react';
import { Phase, ClientCard } from '../types';
import { Card } from './Card';
import { AddCardForm } from './AddCardForm';

interface ColumnProps {
  phase: Phase;
  cards: ClientCard[];
  onDrop: (cardId: string, targetPhaseId: string) => void;
  onCardClick: (card: ClientCard) => void;
  onAddCard: (card: ClientCard) => void;
}

export function Column({ phase, cards, onDrop, onCardClick, onAddCard }: ColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const cardId = e.dataTransfer.getData('text/plain');
      if (cardId) {
        onDrop(cardId, phase.id);
      }
    },
    [onDrop, phase.id]
  );

  const handleAddCard = useCallback(
    (card: ClientCard) => {
      onAddCard({ ...card, phaseId: phase.id });
      setShowAddForm(false);
    },
    [onAddCard, phase.id]
  );

  return (
    <div
      className={`column ${isDragOver ? 'column--drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="column-header">
        <div className="column-header-top">
          <h2 className="column-title">{phase.title}</h2>
          <span className="column-count">{cards.length}</span>
        </div>
        <p className="column-description">{phase.description}</p>
      </div>

      <div className="column-cards">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={onCardClick} />
        ))}
      </div>

      {showAddForm ? (
        <AddCardForm
          phaseId={phase.id}
          onAdd={handleAddCard}
          onCancel={() => setShowAddForm(false)}
        />
      ) : (
        <button
          className="column-add-btn"
          onClick={() => setShowAddForm(true)}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Mandant hinzufügen
        </button>
      )}
    </div>
  );
}