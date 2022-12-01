import "./PageError500.css";
const PageError500 = () => {
  return (
    <div className="page404">
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div className="innerCircle">
              <i className="fa fa-cogs"></i>
              <span>500</span>
            </div>
            <span className="innerStatus">Opps! Internal Server Error!</span>
            <span className="innerDetail">
              Unfortunately we're having trouble loading the page you are
              looking for. Please come back in a while.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageError500;
