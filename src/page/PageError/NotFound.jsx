import { Link } from "react-router-dom";
import "./PageError500.css";
const NotFound = () => {
  return (
    <div className="page404">
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div className="innerCircle">
              <i className="fa fa-cogs"></i>
              <span>404</span>
            </div>
            <span className="innerStatus">Opps! NOT FOUND!</span>
            <Link className="innerStatus font-weight-bold  text-wrap " to="/">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
