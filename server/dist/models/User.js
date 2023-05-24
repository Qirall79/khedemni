"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userModel = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    sector: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    birth: { type: Date, required: true },
    service: { type: String, required: true },
    availability: [String],
    minPrice: { type: Number, required: true },
    maxPrice: { type: Number, required: true },
    photo: { type: String },
    note: { type: String },
});
exports.default = (0, mongoose_1.model)("User", userModel);
