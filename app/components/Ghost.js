
export default function Ghost({style}) {

  return (
    <div className="ghost" style={style}>
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


