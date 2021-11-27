const router = require("express").Router();
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.send(req.user); //req.user contains the _id of the user because of verifyToken
});

module.exports = router;
