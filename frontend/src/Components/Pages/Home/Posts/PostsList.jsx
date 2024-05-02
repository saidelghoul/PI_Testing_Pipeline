import axios from "axios";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";

import PostContainer from "./PostView/PostContainer";
import { postTypes } from "../utils/const";

function BasicExample() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default function PostsList({ userProfileId }) {
  const [allPosts, setAllPosts] = useState([]);
  const [filtredPosts, setFiltredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (userProfileId)
      setFiltredPosts(
        allPosts.filter((post) => post.creator?._id === userProfileId)
      );
    else setFiltredPosts(allPosts);
  }, [allPosts]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const textPostsRes = await axios.get("/publications/getall");
      const eventPostsRes = await axios.get("/evenemnt/getall");

      const textPosts = textPostsRes.data.map((post) => ({
        ...post, // copying all the proerties from the object
        postType: postTypes.TEXT, //add value text to postType
      }));

      const eventPosts = eventPostsRes.data.map((post) => ({
        ...post,
        postType: postTypes.EVENT,
      }));

      const combinedPosts = [...textPosts, ...eventPosts];
      // Sort combinedPosts by DatePublication
      combinedPosts.sort(
        (a, b) => new Date(b.DatePublication) - new Date(a.DatePublication)
      );

      setAllPosts(combinedPosts);
    } catch (error) {
      console.error("Error fetching posts", error);
    } finally {
      setIsLoading(false); // Set loading to false regardless of success or failure
    }
  };

  if (isLoading) {
    return <BasicExample />;
  }

  return (
    <div className="posts-section">
      <div className="posty">
        <div className="post-bar no-margin">
          {filtredPosts.map((postContent) => (
            <PostContainer
              key={postContent._id}
              postContent={postContent}
              fetchPosts={fetchPosts} // needed for updating
            />
          ))}
        </div>
      </div>
    </div>
  );
}
