const express =require('express');
const router= express.Router();
const { register,registerCont } =require("../controllers/register");

router
  .route("/register")
  .post(register);

router
  .route("/register/collector")
  .post(registerCont);

module.exports = router;