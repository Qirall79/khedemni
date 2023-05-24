"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const companyModel = new mongoose_1.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    personFirstName: { type: String, required: true },
    personLastName: { type: String, required: true },
    personStatus: { type: String, required: true },
    city: { type: String, required: true },
    sector: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    activity: { type: String, required: true },
    note: { type: String },
});
exports.default = (0, mongoose_1.model)("Company", companyModel);
