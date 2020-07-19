import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

//export const PostList = () => {
export default () => {
  const [posts, setPosts] = useState({});

  // const fetchPosts = async () => {
  //   const res = await axios.get("http://localhost:4000/posts");
  //   setPosts(res.data);
  // };

  //After creating Query Service, we can forward fetchPosts request to QueryService
  //rather than PostsService 
  const fetchPosts = async () => {
    //const res = await axios.get("http://localhost:4002/posts");
    const res = await axios.get("http://posts.com:4002/posts");
    //console.log(res.data);
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //console.log(posts);
  //Object.values(posts); //this will return array of posts
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          {/* <CommentList postId={post.id} /> //commented because all comments inside the post object */}
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
