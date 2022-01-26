const express =require('express');
const router= express.Router();
const { send } = require("../controllers/send-data");

router
  .route("/waste/data")
  .post(send);

module.exports = router;  