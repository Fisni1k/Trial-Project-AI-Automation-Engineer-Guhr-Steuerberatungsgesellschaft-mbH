import { Phase, ClientCard } from '../types';
import { Column } from './Column';

interface BoardProps {
  phases: Phase[];
  cards: ClientCard[];
  onDrop: (cardId: string, targetPhaseId: string) => void;
  onCardClick: (card: ClientCard) => void;
  onAddCard: (card: ClientCard) => void;
}

export function Board({ phases, cards, onDrop, onCardClick, onAddCard }: BoardProps) {
  return (
    <div className="board">
      {phases.map((phase) => (
        <Column
          key={phase.id}
          phase={phase}
          cards={cards.filter((card) => card.phaseId === phase.id)}
          onDrop={onDrop}
          onCardClick={onCardClick}
          onAddCard={onAddCard}
        />
      ))}
    </div>
  );
}