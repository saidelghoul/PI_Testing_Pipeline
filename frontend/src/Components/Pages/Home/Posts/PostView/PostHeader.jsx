import { useContext } from "react";
import { UserContext } from "../../../../../../context/userContext";
import { isCreator } from "../../utils/utils";
import PostDelete from "../ActionIcons/PostDelete";
import PostUpdate from "../ActionIcons/PostUpdate";
import moment from "moment/moment";
export default function PostHeader({ postContent, fetchPosts }) {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="post_topbar">
        <div className="usy-dt">
          <img src="/assets/images/resources/us-pc2.png" alt="" />
          <div className="usy-name">
            <h3>{postContent.creator?.name}</h3>
            <span>
              <img src="/assets/images/clock.png" alt="" />
              Published in:{" "}
              {moment(postContent.DatePublication).format("lll")}
            </span>
          </div>
        </div>
        <div className="ed-opts">
          {isCreator(user.id, postContent.creator?._id) && (
            <PostDelete postContent={postContent} fetchPosts={fetchPosts} />
          )}
          {isCreator(user.id, postContent.creator?._id) && (
            <PostUpdate postContent={postContent} />
          )}
        </div>
      </div>
      <div className="epi-sec">
        <ul className="descp"></ul>
      </div>
    </>
  );
}
