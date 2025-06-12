import express from "express";

import cors from "cors";
import corsConfig from "./config/corsConfig.js";

import { rateLimit } from "express-rate-limit";
import rateLimitConfig from "./config/rateLimitConfig.js";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(cors(corsConfig));
app.use(rateLimit(rateLimitConfig));

import rootRouter from "./routes/rootRoute.js";
import signupRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";
import blogsRouter from "./routes/blogsRoute.js";
import verifyRouter from "./routes/verifyRoute.js";

app.use("/", rootRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/blogs", blogsRouter);
app.use("/verify", verifyRouter);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err);
  res.status(500).json({ message: "Something broke!" });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
