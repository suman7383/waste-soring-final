const express =require('express');
const router= express.Router();
const { login, isAuthenticated } =require("../controllers/login");

router
  .route("/login")
  .post(login);

router
  .route("/isLoggedIn")
  .post(isAuthenticated)  

module.exports = router;