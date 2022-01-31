const express =require('express');
const router= express.Router();
const { send,sendToFront } = require("../controllers/send-data");

router
  .route("/waste/data")
  .post(send);

router
  .route("/waste/data/get")
  .get(sendToFront)    

module.exports = router;  