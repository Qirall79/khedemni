import express, { NextFunction, Request, Response, Express } from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import "./utils/passport";

// Routers
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// connect the database
const mongodb = process.env.MONGODB || "";

connect(mongodb)
  .then(() => {
    console.log("Connected to Database successfully !");
  })
  .catch((err) => {
    console.log(err);
  });

// cross origin resource sharing
app.use(cors());

// basic setup
app.use(helmet());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello l3alam !");
  return;
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    message: error.message,
  });
  return;
});

// Server listening
app.listen(port, (): void => {
  console.log("server started on port " + port);
});
