import CreatPost from "./CreatPost.jsx";
import PostsList from "../Posts/PostsList.jsx";

export default function Feed() {
  return (
    <div className="col-lg-6 col-md-8 no-pd">
      <div className="main-ws-sec">
        <CreatPost />
        <PostsList />
      </div>
    </div>
  );
}
