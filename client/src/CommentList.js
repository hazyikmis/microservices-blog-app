//import React, { useState, useEffect } from "react";
import React from "react";
//import axios from "axios";

//export const CommentList = () => {
//export default ({ postId }) => {
export default ({ comments }) => {
//The commented section below no needed anymore, because when we are fetching
//posts from Query Service, all comments also come together with the posts 
/*
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
*/

  const renderedComments = comments.map((comment) => {
    let content;
    if (comment.status === "approved") {
      content = comment.content;
    } else if (comment.status === "pending") {
      content = "This comment is awaiting moderation";
    } else if (comment.status === "rejected") {
      content = "This comment is has been rejected";
    } 
    //return <li key={comment.id}>{comment.content}</li>;
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
