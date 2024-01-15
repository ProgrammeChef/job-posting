const mongoose = require("../db");

const job = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  hireMName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  roleType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cType: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  ote: {
    type: String,
    required: true,
  },
  inboundLeads: {
    type: Boolean,
    required: true,
  },
  prospecting: {
    type: Boolean,
    required: true,
  },
  averageOrder: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobType: {
    type: Boolean,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  expiration_date: {
    type: String,
    required: true,
  },
  jstatus: {
    type: String,
    required: true,
  },
  companyDescription: {
    type: String,
    required: true,
  },
  companyUrl: {
    type: String,
    required: true,
  },
  headerImageUrl: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", job);

module.exports = Job;
