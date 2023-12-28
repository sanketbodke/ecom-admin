import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
//   })
// );

app.use(cors());

app.use(express.json({ limit: "900kb" }));
app.use(express.urlencoded({ extended: true, limit: "900kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes

import userRoute from "./routes/user.route.js";
import billBoardRoute from "./routes/billBoard.route.js";
import colorRoute from "./routes/color.route.js";

// routes declaration

app.use("/api/v1/users/", userRoute);
app.use("/api/v1/billBoard/", billBoardRoute);
app.use("/api/v1/color/", colorRoute)

export { app }