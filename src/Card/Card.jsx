//Card.jsx
import "./Card.css";

export default function Card({ src, isOpen, onClick }) {
  return (
    <div className={`card ${isOpen ? "card-show" : ""}`} onClick={onClick}>
      {isOpen && <img src={src} alt="" />}
    </div>
  );
}
