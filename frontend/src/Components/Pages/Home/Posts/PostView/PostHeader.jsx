import { isCreator, getReportPostEndpoint, validDate } from "../../utils/utils";
import PostDelete from "../ActionIcons/PostDelete";
import PostUpdate from "../ActionIcons/PostUpdate";
import moment from "moment/moment";
import { postTypes, reported } from "../../utils/const";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function PostHeader({ postContent, fetchPosts, user }) {
  const reportPostEndpoint = getReportPostEndpoint(postContent?.postType);

  const userId = user ? user.id : null;

  const userReportThisPost = postContent?.reports
    ? postContent?.reports?.includes(user?.id)
    : false;

  const handleReportClick = async () => {
    try {
      const ReportData = {
        userId: userId,
      };

      await axios.post(`${reportPostEndpoint}/${postContent?._id}`, ReportData);
      alert("report added");
    } catch (error) {
      // An error occurred while setting up the request
      console.error("Error setting up the request:", error.message);
      alert("Error setting up the request: " + error.message);
    }
  };

  return (
    <>
      <div className="post_topbar">
        <div className="usy-dt">
          <div className="usy-name">
            <h3>{postContent?.creator?.name}</h3>
            <span>
              <img src="/assets/images/clock.png" alt="" />
              Published in: {moment(postContent?.DatePublication).format("lll")}
            </span>
          </div>
        </div>
        <div className="ed-opts">
          {!isCreator(userId, postContent?.creator?._id) && (
            <Button
              size="sm"
              onClick={() => handleReportClick(postContent?._id)}
              variant={userReportThisPost ? reported.NO : reported.YES}
            >
              Alert
            </Button>
          )}
          {isCreator(userId, postContent?.creator?._id) && (
            <PostDelete postContent={postContent} fetchPosts={fetchPosts} />
          )}
          {isCreator(userId, postContent?.creator?._id) &&
            (postContent?.postType === postTypes.TEXT ||
              validDate(postContent?.DateDebut, 4)) && (
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
