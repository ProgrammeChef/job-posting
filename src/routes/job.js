const express = require("express");
const Job = require("../models/job");

const router = express.Router();

router.post("/post", async (req, res) => {
  console.log("req", req.body);
  let newJob = new Job(req.body);
  await newJob.save().then(() => {
    res.json({ message: "success to post!" });
  });
});

router.get('/get', (req, res) => {
  Job.find({})
    .then(result => {
      console.log(result);
      res.send(result);
      // res.json({ message: "success to post!" });
    })
    .catch((err) => {
      res.status(500)
      .json({ message: "Something went wrong." });
    });
});

module.exports = router;