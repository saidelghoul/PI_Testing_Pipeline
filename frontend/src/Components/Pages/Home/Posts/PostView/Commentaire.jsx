import moment from "moment";
import { reported } from "../../utils/const";
import { useContext } from "react";
import { UserContext } from "../../../../../../context/userContext";
import axios from "axios";
import CommentDelete from "../ActionIcons/CommentDelete";
import { isCreator } from "../../utils/utils";
import { Button } from "react-bootstrap";

export default function Commentaire({ comment }) {
  const { user } = useContext(UserContext);

  const userReportThisPost = comment.reports
    ? comment.reports.includes(user?.id)
    : false;

  const handleCommentReportClick = async () => {
    try {
      const ReportData = {
        userId: user.id,
      };

      await axios.post(`commentaire/report/${comment._id}`, ReportData);

      alert("report added");
    } catch (error) {
      // An error occurred while setting up the request
      console.error("Error setting up the request:", error.message);
      alert("Error setting up the request: " + error.message);
    }
  };

  return (
    <div className="comment-sec">
      {isCreator(user.id, comment.creator?._id) && (
        <CommentDelete comment={comment} />
      )}
      <Button
        onClick={() => handleCommentReportClick(comment._id)}
        variant={userReportThisPost ? reported.NO : reported.YES}
      >
        !
      </Button>
      <ul>
        {
          <div className="comment-list">
            <div className="bg-img">
              <img src="/assets/images/resources/bg-img3.png" alt="" />
            </div>
            <div className="comment">
              <h3>{comment.creator?.name}</h3>
              <span>
                <img src="/assets/images/clock.png" alt="" />{" "}
                {moment(comment.DateCreation).format("lll")}
              </span>
              <p>{comment.contenu}</p>
            </div>
          </div>
        }
      </ul>
    </div>
  );
}
