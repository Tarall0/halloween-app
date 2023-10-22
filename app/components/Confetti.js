const Confetti = ({ angle, top, left, opacity, color }) => {
    return (
      <div
        className="confetti"
        style={{
          top: `${top}px`,
          left: `${left}px`,
          transform: `rotate(${angle}deg)`,
          opacity: `${opacity}`,
          backgroundColor: `${color}`,
        }}
      ></div>
    );
  };

  export default Confetti;
