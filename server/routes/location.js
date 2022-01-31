const express =require('express');
const router= express.Router();
const { addCity, getCity, addLocality, getLocality } =require("../controllers/location");

router
  .route("/city/add")
  .post(addCity);

router
.route("/locality/add")
.post(addLocality);

router
.route("/city/get")
.get(getCity);

router
.route("/locality/get")
.get(getLocality);

module.exports = router;