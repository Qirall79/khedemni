"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
require("./utils/passport");
// Routers
const auth_1 = __importDefault(require("./routes/auth"));
const user_1 = __importDefault(require("./routes/user"));
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// connect the database
const mongodb = process.env.MONGODB || "";
(0, mongoose_1.connect)(mongodb)
    .then(() => {
    console.log("Connected to Database successfully !");
})
    .catch((err) => {
    console.log(err);
});
// cross origin resource sharing
app.use(cors());
// basic setup
app.use((0, helmet_1.default)());
app.use(logger("dev"));
app.use(cookieParser());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.get("/", (req, res) => {
    res.send("Hello l3alam !");
    return;
});
app.use("/auth", auth_1.default);
app.use("/users", user_1.default);
// Error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
    });
    return;
});
// Server listening
app.listen(port, () => {
    console.log("server started on port " + port);
});
