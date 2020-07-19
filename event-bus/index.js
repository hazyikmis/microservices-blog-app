//VERY SIMPLE VERY BASIC EVENT BUS IMPLEMENTATION
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = new express();
app.use(bodyParser.json());

const events = []; //event bus data store

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event); //ordered list of all events from beginning up to now

  //we are assuming that all posts below successfully sent
  //normally there must be some kind of error handling mechanism
  //axios.post("http://localhost:4000/events", event);
  axios.post("http://posts-clusterip-srv:4000/events", event);
  //axios.post("http://localhost:4001/events", event);
  axios.post("http://comments-clusterip-srv:4001/events", event);
  //axios.post("http://localhost:4002/events", event);
  axios.post("http://query-clusterip-srv:4002/events", event);
  //axios.post("http://localhost:4003/events", event);
  axios.post("http://moderation-clusterip-srv:4003/events", event);

  res.send({status: "OK"});
});

app.get("/events", (req, res) => {
  res.send(events);
})

app.listen(4005, () => {
  console.log("Event bus service is listening on port: 4005")
})