import jwt from "jsonwebtoken";

const verifyTok = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    // next()  allows us to continue to the next middleware, without it server will crash
    next();
  } catch (err) {
    res.json({ auth: false, message: "You failed to authinticate" });
  }
};

export default verifyTok;
