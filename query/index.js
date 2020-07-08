const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId]; //find the appropriate post
    post.comments.push({id, content, status})
  } else if (type === "CommentUpdated") {
    const {id, content, postId, status} = data;
    const post = posts[postId];
    const comment = post.comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }

  console.log(posts);
  
  res.send({});
});

app.listen(4002, () => {
  console.log("Query service is listening on port: 4002");
});

//data structure
/*
posts === {
  '454ae54' : {
    id: '454ae54', //postId
    title: 'post title',
    comments: [
      {id: '33530', content: 'comment'},
      {id: '23119', content: 'commentx'},
    ]
  },
  '666e54' : {
    id: '666e54', //postId
    title: 'post title',
    comments: [
      {id: '34530', content: 'comment'},
    ]
  },
  '4542222' : {
    id: '4542222', //postId
    title: 'post title',
    comments: [
      {id: '14530', content: 'comment'},
      {id: '66666', content: 'commentx'},
      {id: '23429', content: 'commenty'},
    ]
  }
}
*/
