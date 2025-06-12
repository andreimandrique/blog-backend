import dotenv from "dotenv";

dotenv.config();

const corsConfig = {
  origin: process.env.FRONTEND,
  methods: "GET,POST,PATCH,DELETE",
};

export default corsConfig;
