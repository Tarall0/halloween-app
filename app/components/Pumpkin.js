import "../styles/pumpkin.css";

export default function Pumpkin() {
  return (
    <div className="pumpkin">
        <div className="stem"></div>
        <div className="eyes">
            <div className="eye left-eye">
                <div className="triangle"></div>
            </div>
            <div className="eye right-eye">
                <div className="triangle"></div>
            </div>
        </div>
        <div className="mouth">
            <div className="tooth tooth-left"></div>
            <div className="tooth tooth-right"></div>
        </div>
        <div className="shadow"></div>
    </div>
);
}
