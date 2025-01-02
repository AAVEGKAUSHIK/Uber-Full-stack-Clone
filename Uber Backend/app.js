import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectTodb from "./DB/db.js";
import cors from "cors";
import userRoutes from "./Routes/user.routes.js";

const app = express();

connectTodb();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/user", userRoutes);


export default app;