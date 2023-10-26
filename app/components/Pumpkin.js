import "../styles/pumpkin.css"
import { useState } from "react";

const Pumpkin = () => {

  const [showPumpkin, setShowPumpkin] = useState(false);

  const pumpkinClick = () => {
    setShowPumpkin(true);
    
    setTimeout(() => {
      setShowPumpkin(false);
    }, 5000);

  }


  return (
    <>

    <div className="pumpkin" onClick={pumpkinClick}>
    {showPumpkin ? (
      <div className="pumpkin-msg">Happy halloween!</div>
    ) : (
      ""
    )}
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
    
    <div className="mouth">
      <div className="right-teeth"></div>
    </div>
  </div>
  </>
  );
};

export default Pumpkin;
