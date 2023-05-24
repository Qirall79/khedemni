"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/current", passport_1.default.authenticate("jwt", { session: false }), authController_1.default.current_get);
router.post("/company/signUp", authController_1.default.company_signUp);
router.post("/company/login", authController_1.default.company_login);
router.post("/user/signUp", authController_1.default.user_signUp);
router.post("/user/login", authController_1.default.user_login);
exports.default = router;
