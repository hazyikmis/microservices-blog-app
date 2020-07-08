const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {

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

}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  //console.log(posts);
  
  res.send({});
});

app.listen(4002, async () => {
  console.log("Query service is listening on port: 4002");

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing event:", event.type);
    handleEvent(event.type, event.data);
  }
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
