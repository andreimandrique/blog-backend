import express from "express";
import cors from "cors";

const PORT = 3000;
const app = express();

app.use(express.json());

app.use(cors());

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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
