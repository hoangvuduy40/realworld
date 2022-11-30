import { Link } from "react-router-dom";
const PopularTags = ({ tags, handleTag }) => {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <p>Popular Tags</p>

        <div className="tag-list">
          {tags.map((tag) => {
            return (
              <Link
                className="tag-pill tag-default"
                key={tag}
                onClick={() => handleTag(tag)}
              >
                {tag}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default PopularTags;
