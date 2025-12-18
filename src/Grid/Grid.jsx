//Grid.jsx
import "./Grid.css";
import Card from "../Card/Card";
import { images } from "../data";
import { useEffect, useState } from "react";

export default function Grid() {
  const [cards, setCards] = useState([]);
  const [opened, setOpened] = useState([]);
  const [lock, setLock] = useState(false);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  //окно в конце
  const [isWin, setIsWin] = useState(false); 

  // старт игры
  useEffect(() => {
    startNewGame();
  }, []);

  // таймер
  useEffect(() => {
    if (!timerActive) return;

    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive]);

  const startNewGame = () => {
    setCards(
      shuffle(
        images.map(card => ({
          ...card,
          isOpen: false,
          isMatched: false,
        }))
      )
    );
    setOpened([]);
    setMoves(0);
    setTime(0);
    setTimerActive(false);
    setLock(false);
    setIsWin(false);
  };

  const handleCardClick = (id) => {
    if (lock || isWin) return;

    if (!timerActive) {
      setTimerActive(true);
    }

    const clickedCard = cards.find(card => card.id === id);
    if (clickedCard.isOpen || clickedCard.isMatched) return;

    setCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, isOpen: true } : card
      )
    );

    setOpened(prev => [...prev, id]);
  };

  // проверка двух карточек
  useEffect(() => {
    if (opened.length === 2) {
      setLock(true);
      setMoves(prev => prev + 1);

      const [firstId, secondId] = opened;
      const first = cards.find(c => c.id === firstId);
      const second = cards.find(c => c.id === secondId);

      if (first.pairId === second.pairId) {
        setCards(prev =>
          prev.map(card =>
            card.pairId === first.pairId
              ? { ...card, isMatched: true }
              : card
          )
        );
        setOpened([]);
        setLock(false);
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.isMatched ? card : { ...card, isOpen: false }
            )
          );
          setOpened([]);
          setLock(false);
        }, 1500);
      }
    }
  }, [opened, cards]);

  // проверка победы
  useEffect(() => {
    if (cards.length && cards.every(card => card.isMatched)) {
      setTimerActive(false);
      setLock(true); // что бы больше ничего не тыкалось 
      setTimeout(() => {
        setIsWin(true);
      }, 600); // задержка до конца
    }
  }, [cards]);

  return (
    <>
      <div className="game-info">
        <div className="moves">Ходы: {moves}</div>
      </div>
      <div className="game-info">
        <div className="time">Время: {formatTime(time)}</div>
      </div>

      <div className="container">
        {cards.map(card => (
          <Card
            key={card.id}
            src={card.url}
            isOpen={card.isOpen || card.isMatched}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      <div className="button-wrapper">
        <button className="again" onClick={startNewGame}>
            Начать заново
        </button>
      </div>

      {isWin && (
        <div className="win-overlay">
          <div className="win-modal">
            <h2>🎉 Победа! 🎉</h2>
            <p>Ходы: {moves}</p>
            <p>Время: {formatTime(time)}</p>
            <button className="again2" onClick={startNewGame}>Сыграть ещё раз</button>
          </div>
        </div>
      )}
    </>
  );
}

// 
function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
}