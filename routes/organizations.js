var express = require('express');
var router = express.Router();

/* GET Organizatios public listing. */
router.get('/1/public', function (req, res, next) {
  // Public data
  const data = {
    name: "",
    image: "",
    phone: "",
    address: "",
    welcomeText: "",
  };
  res.status(200).json(data);
});



module.exports = router;