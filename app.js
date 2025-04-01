import express from 'express';

const PORT= 3000;
const app = express();

app.use(express.json());

import rootRouter from "./routes/rootRoute.js";
import signupRouter from "./routes/signupRoute.js";
import loginRouter from "./routes/loginRoute.js";
import blogsRouter from "./routes/blogsRoute.js";

app.use("/", rootRouter);
app.use("/sign-up", signupRouter);
app.use("/log-in", loginRouter);
app.use("/blogs", blogsRouter);

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)})
