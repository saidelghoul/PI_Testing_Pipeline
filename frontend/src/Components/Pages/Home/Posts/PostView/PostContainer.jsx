import TextPost from "./TextPost";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import EventPost from "./EventPost";
import { postTypes } from "../../const";

export default function PostContainer({ postContent, fetchPosts }) {
  return (
    <div className="job-status-bar">
      <PostHeader postContent={postContent} fetchPosts={fetchPosts} />
      {postContent?.postType === postTypes.TEXT && (
        <TextPost postContent={postContent} fetchPosts={fetchPosts} />
      )}
      {postContent?.postType === postTypes.EVENT && (
        <EventPost postContent={postContent} fetchPosts={fetchPosts} />
      )}
      <PostFooter postContent={postContent} fetchPosts={fetchPosts} />
    </div>
  );
}
