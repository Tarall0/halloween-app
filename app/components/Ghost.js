

export default function Ghost(top, left, transform) {

    const ghostStyle = {
        top,
        left,
        transform: transform,
      };

  return (
    <div className="ghost" style={ghostStyle}>
      <div className="body">
        <div className="head">
          <div className="eyes">
            <div className="eye left-eye"></div>
            <div className="eye right-eye"></div>
          </div>
          <div className="mouth"></div>
        </div>
      </div>
      <div className="tail"></div>
    </div>
  );
};


