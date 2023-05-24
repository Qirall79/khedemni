"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = __importDefault(require("../controllers/usersController"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/", passport_1.default.authenticate("jwt", { session: false }), usersController_1.default.users_all);
router.get("/:id", passport_1.default.authenticate("jwt", { session: false }), usersController_1.default.user_get);
exports.default = router;
