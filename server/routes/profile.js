const express =require('express');
const router= express.Router();
const { data, dataC } =require("../controllers/profile");
const { updateProfile, updatePassword } = require("../controllers/update_profile")

router
  .route("/citizen/profile")
  .post(data);

router
  .route("/collector/profile")
  .post(dataC);
  
router
  .route("/citizen/profile/updateA")
  .post(updateProfile);  

router
  .route("/citizen/profile/updateP")
  .post(updatePassword);  

module.exports = router;