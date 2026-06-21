import { useState, useCallback } from 'react';
import { ClientCard } from './types';
import { PHASES, SAMPLE_CARDS } from './data';
import { Board } from './components/Board';
import { CardModal } from './components/CardModal';

function App() {
  const [cards, setCards] = useState<ClientCard[]>(SAMPLE_CARDS);
  const [selectedCard, setSelectedCard] = useState<ClientCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDrop = useCallback((cardId: string, targetPhaseId: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, phaseId: targetPhaseId } : card
      )
    );
  }, []);

  const handleCardClick = useCallback((card: ClientCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCard(null);
  }, []);

  const handleUpdateCard = useCallback((updatedCard: ClientCard) => {
    setCards((prev) =>
      prev.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    setSelectedCard(updatedCard);
  }, []);

  const handleAddCard = useCallback((newCard: ClientCard) => {
    setCards((prev) => [...prev, newCard]);
  }, []);

  const handleDeleteCard = useCallback((cardId: string) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId));
    setIsModalOpen(false);
    setSelectedCard(null);
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1B2B4B" />
              <path d="M8 12h16M8 16h12M8 20h14" stroke="#E8C47C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="logo-text">TSK</span>
          </div>
          <h1 className="header-title">Mandanten-Onboarding</h1>
        </div>
        <div className="header-right">
          <span className="header-stat">
            {cards.length} Mandanten
          </span>
          <span className="header-stat">
            {cards.filter((c) => c.status === 'urgent').length} Dringend
          </span>
        </div>
      </header>

      <Board
        phases={PHASES}
        cards={cards}
        onDrop={handleDrop}
        onCardClick={handleCardClick}
        onAddCard={handleAddCard}
      />

      {isModalOpen && selectedCard && (
        <CardModal
          card={selectedCard}
          onClose={handleCloseModal}
          onUpdate={handleUpdateCard}
          onDelete={handleDeleteCard}
        />
      )}
    </div>
  );
}

export default App;