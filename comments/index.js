const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

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

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const {content} = req.body;
  const postId = req.params.id;

  const comments = commentsByPostId[postId] || [];
  comments.push({id: commentId, content});
  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
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
