import "../styles/pumpkin.css"

const Pumpkin = () => {
  return (
    <div className="pumpkin">
    <div className="stalk"></div>
    <div className="segments">
      <div className="segment left-2"></div>
      <div className="segment left-1"></div>
      <div className="segment centre"></div>
      <div className="segment right-1"></div>
      <div className="segment right-2"></div>
    </div>
  
    <div className="eyes">
      <div className="eye left-eye"></div>
      <div className="eye right-eye"></div>
    </div>
    
    <div class="mouth"></div>
  </div>
  );
};

export default Pumpkin;
