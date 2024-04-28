import { Link } from "react-router-dom";
import { getUpdateLink } from "../../utils/utils";

export default function PostUpdate({ postContent }) {
  const updateLink = getUpdateLink(postContent.postType);

  return (
    <Link
      to={`${updateLink}/${postContent._id}`}
      title="Update"
      className="ed-opts-open"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-pencil-square"
        viewBox="0 0 16 16"
      />
    </Link>
  );
}
