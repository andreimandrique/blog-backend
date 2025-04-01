import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = bearerToken.split(' ')[1];

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: err });
        }
        req.user = decoded;
        next();
    })
}

export default verifyToken;
