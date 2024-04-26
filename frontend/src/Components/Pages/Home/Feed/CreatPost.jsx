import { Link } from "react-router-dom";

export default function CreatPost() {
  return (
    <div className="post-topbar">
      <div className="user-picy">
        <img src="/assets/images/resources/user-pic.png" alt="" />
      </div>
      <div className="post-st">
        <ul>
          <li>
            <Link className="post_project" to="/addEvent" title="">
              Ajout Evenement
            </Link>
          </li>
          <li>
            <Link className="post" to="/addPub" title="">
              Ajout Publication
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
