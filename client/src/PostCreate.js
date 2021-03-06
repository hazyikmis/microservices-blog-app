import React, { useState } from "react";
import axios from "axios";

//export const PostCreate = () => {
export default () => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //await axios.post("http://localhost:4000/posts", {title});
    //await axios.post("http://posts.com/posts", {title});
    await axios.post("http://posts.com/posts/create", {title});
    setTitle("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
