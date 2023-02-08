import express from 'express'
import verify from './verifyToken.js'
const router = express.Router();

router.get("/", verify, (req, res) => {
  res.send(req.user); //req.user contains the _id of the user because of verifyToken
});

export default router;
