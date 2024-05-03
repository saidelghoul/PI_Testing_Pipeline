import TextPost from "./TextPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import EventPost from "./EventPost";
import { postTypes } from "../../utils/const";
import { Card } from "react-bootstrap";

export default function PostContainer({ postContent, fetchPosts }) {
  const nbReportes = postContent.reports.length;
  if (nbReportes < 3) {
    return (
      <Card>
        <Card.Body>
          <PostHeader postContent={postContent} fetchPosts={fetchPosts} />
          <div className="job-status-bar">
            <div className="epi-sec">
              <ul className="descp"></ul>
            </div>
            {postContent?.postType === postTypes.TEXT && (
              <TextPost postContent={postContent} fetchPosts={fetchPosts} />
            )}
            {postContent?.postType === postTypes.EVENT && (
              <EventPost postContent={postContent} fetchPosts={fetchPosts} />
            )}
          </div>
          <PostFooter postContent={postContent} fetchPosts={fetchPosts} />
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}
