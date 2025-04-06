import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyGet = (req, res) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = bearerToken.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.status(401).json({ error: err });
    }
    res.status(200).json({ message: "Account is verified" });
  });
};

export default verifyGet;
