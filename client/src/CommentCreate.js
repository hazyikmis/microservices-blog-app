import React, {useState} from 'react';
import axios from 'axios';

//export const CommentCreate = () => {
export default ({postId}) => {
  const [content, setContent] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    //await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
    await axios.post(`http://posts.com/posts/${postId}/comments`, {
      content
    });
    setContent("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>New Comment</label>
          <input value={content} onChange={e => setContent(e.target.value)} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
