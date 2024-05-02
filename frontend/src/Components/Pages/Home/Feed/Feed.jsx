import CreatPost from "./CreatPost.jsx";
import PostsList from "../Posts/PostsList.jsx";

export default function Feed() {
  return (
    <div className="col-lg-6 col-md-8 no-pd">
      <div className="main-ws-sec">
        <CreatPost />
        <PostsList />
        {/* <PostsList userProfileId="66003975d5854d860d08b7b6" /> */}
      </div>
    </div>
  );
}
