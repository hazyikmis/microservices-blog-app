const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const axios = require("axios");

const {randomBytes} = require('crypto');

const app = new express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {}; //in-memory data structure

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
})

app.get('/posts/allComments', (req, res) => {
  res.send(commentsByPostId);
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const {content} = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({id: commentId, content, status:'pending'});
  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId,
      status: 'pending'
    }
  })

  res.status(201).send(comments);
})

app.post("/events", async (req, res) => {
  console.log("Received event:", req.body.type);
  
  const { type, data } = req.body;

  if (type === 'CommentModerated') {
    const {postId, id, status, content} = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find(comment => {
      return comment.id === id;
    });
    comment.status = status; //thats enough for writing back

    await axios.post("http://localhost:4005/events", {
      type: 'CommentUpdated',
      data: {
        id, status, postId, content
      }
    })
  }

  res.send({});
})

app.listen(4001, () => {
  console.log("Comments service is listening on port: 4001")
})


/*
//structure of commentsByPostId
{
  "56aae45" : [
      {
        id: "feaff56",
        content: "this is comment body..." 
      },
      {
        id: "aea0000",
        content: "this is another comment body..." 
      },
      ...
    ]
  ,
  "0099aaaf5": [
      {
        id: "feaff56",
        content: "this is comment body..." 
      },
      {
        id: "aea0000",
        content: "this is another comment body..." 
      },
      ...
    ]
  ...
}
*/
