"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const express_validator_1 = require("express-validator");
const Company_1 = __importDefault(require("../models/Company"));
const User_1 = __importDefault(require("../models/User"));
// get env variables
dotenv_1.default.config();
// Sign up company
const company_signUp = [
    (0, express_validator_1.body)("name").isLength({ min: 1 }).withMessage("Company name is required."),
    (0, express_validator_1.body)("type").isLength({ min: 1 }).withMessage("Company type is required."),
    (0, express_validator_1.body)("person_first_name")
        .isLength({ min: 1 })
        .withMessage("Person's first name is required."),
    (0, express_validator_1.body)("person_last_name")
        .isLength({ min: 1 })
        .withMessage("Person's last name is required."),
    (0, express_validator_1.body)("person_status")
        .isLength({ min: 1 })
        .withMessage("Person's status is required."),
    (0, express_validator_1.body)("city").isLength({ min: 1 }).withMessage("City is required."),
    (0, express_validator_1.body)("sector").isLength({ min: 1 }).withMessage("Sector is required."),
    (0, express_validator_1.body)("phone").isLength({ min: 1 }).withMessage("Phone is required."),
    (0, express_validator_1.body)("email").isLength({ min: 1 }).withMessage("Email is required."),
    (0, express_validator_1.body)("activity").isLength({ min: 1 }).withMessage("Activity is required."),
    (0, express_validator_1.body)("password").isLength({ min: 1 }).withMessage("Password is required."),
    (0, express_validator_1.body)("password_confirmation")
        .exists()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match.");
        }
        return true;
    }),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            const passwordHash = (0, bcryptjs_1.hashSync)(req.body.password, salt);
            const company = new Company_1.default({
                name: req.body.name,
                type: req.body.type,
                personFirstName: req.body.person_first_name,
                personLastName: req.body.person_last_name,
                personStatus: req.body.person_status,
                email: req.body.email,
                phone: req.body.phone,
                city: req.body.city,
                sector: req.body.sector,
                activity: req.body.activity,
                note: req.body.note || "",
                password: passwordHash,
            });
            // check for validation errors
            if (!errors.isEmpty()) {
                return res.status(500).json({
                    company,
                    errors: errors.array(),
                });
            }
            // check if email already exists
            const existant = yield Company_1.default.findOne({ email: req.body.email });
            if (existant) {
                return res
                    .status(500)
                    .json({ message: "Cet email est déja existant !" });
            }
            // save company
            yield company.save();
            // login user automatically
            passport_1.default.authenticate("company-local", { session: false }, (error, company, info) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    return res.status(500).json({ error });
                }
                // check if company exists
                if (!company) {
                    return res.status(404).json(info);
                }
                // login company
                req.login(company, { session: false }, (error) => {
                    if (error) {
                        return next(error);
                    }
                    const body = {
                        _id: company._id || "",
                        name: company.name,
                        email: company.email,
                        phone: company.phone,
                        city: company.city,
                        sector: company.sector,
                        activity: company.activity,
                        note: company.note,
                    };
                    const token = (0, jsonwebtoken_1.sign)({ company: body }, process.env.JWT_SECRET || "thisisasecret");
                    res.status(200).json({ token, company: body });
                });
            }))(req, res, next);
        }
        catch (error) {
            return next(error);
        }
    }),
];
// login company
const company_login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("company-local", { session: false }, (error, company, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({ error });
            }
            // check if company exists
            if (!company) {
                return res.status(404).json(info);
            }
            // login company
            req.login(company, { session: false }, (error) => {
                if (error) {
                    return next(error);
                }
                const body = {
                    _id: company._id || "",
                    name: company.name,
                    email: company.email,
                    phone: company.phone,
                    city: company.city,
                    sector: company.sector,
                    activity: company.activity,
                    note: company.note,
                };
                const token = (0, jsonwebtoken_1.sign)({ company: body }, process.env.JWT_SECRET || "thisisasecret");
                res.status(200).json({ token, company: body });
            });
        }))(req, res, next);
    }
    catch (error) {
        return next(error);
    }
});
// Sign up user
const user_signUp = [
    (0, express_validator_1.body)("first_name")
        .isLength({ min: 1 })
        .withMessage("First name is required."),
    (0, express_validator_1.body)("last_name").isLength({ min: 1 }).withMessage("Last name is required."),
    (0, express_validator_1.body)("service").exists().withMessage("Service are required."),
    (0, express_validator_1.body)("city").isLength({ min: 1 }).withMessage("City is required."),
    (0, express_validator_1.body)("sector").isLength({ min: 1 }).withMessage("Sector is required."),
    (0, express_validator_1.body)("phone").isLength({ min: 1 }).withMessage("Phone is required."),
    (0, express_validator_1.body)("birth_date").exists().withMessage("Birth date is required."),
    (0, express_validator_1.body)("availability").exists().withMessage("Availability is required."),
    (0, express_validator_1.body)("min_price").exists().withMessage("Min price is required."),
    (0, express_validator_1.body)("max_price").exists().withMessage("Max price is required."),
    (0, express_validator_1.body)("password").isLength({ min: 1 }).withMessage("Password is required."),
    (0, express_validator_1.body)("password_confirmation")
        .exists()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords don't match.");
        }
        return true;
    }),
    (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            const passwordHash = (0, bcryptjs_1.hashSync)(req.body.password, salt);
            const user = new User_1.default({
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                service: req.body.service,
                phone: req.body.phone,
                photo: req.body.photo,
                city: req.body.city,
                sector: req.body.sector,
                birth: req.body.birth_date,
                availability: req.body.availability,
                minPrice: req.body.min_price,
                maxPrice: req.body.max_price,
                note: req.body.note || "",
                password: passwordHash,
            });
            // check for validation errors
            if (!errors.isEmpty()) {
                return res.status(500).json({
                    user,
                    errors: errors.array(),
                });
            }
            // check if email already exists
            const existant = yield User_1.default.findOne({ phone: req.body.phone });
            if (existant) {
                return res
                    .status(500)
                    .json({ message: "Numéro de téléphone est déja existant !" });
            }
            // save user
            yield user.save();
            // login user automatically
            passport_1.default.authenticate("user-local", { session: false }, (error, user, info) => __awaiter(void 0, void 0, void 0, function* () {
                if (error) {
                    return res.status(500).json({ error });
                }
                // check if user exists
                if (!user) {
                    return res.status(404).json(info);
                }
                // login user
                req.login(user, { session: false }, (error) => {
                    if (error) {
                        return next(error);
                    }
                    const body = {
                        _id: user._id || "",
                        firstName: user.firstName,
                        birth: user.birth,
                        lastName: user.lastName,
                        phone: user.phone,
                        city: user.city,
                        sector: user.sector,
                        services: user.services,
                        minPrice: user.minPrice,
                        maxPrice: user.maxPrice,
                        availability: user.availability,
                        photo: user.photo,
                        note: user.note,
                    };
                    const token = (0, jsonwebtoken_1.sign)({ user: body }, process.env.JWT_SECRET || "thisisasecret");
                    res.status(200).json({ token, user: body });
                });
            }))(req, res, next);
        }
        catch (error) {
            return next(error);
        }
    }),
];
// Login user
const user_login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("user-local", { session: false }, (error, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (error) {
                return res.status(500).json({ error });
            }
            // check if user exists
            if (!user) {
                return res.status(404).json(info);
            }
            // login user
            req.login(user, { session: false }, (error) => {
                if (error) {
                    return next(error);
                }
                const body = {
                    _id: user._id || "",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    city: user.city,
                    sector: user.sector,
                    services: user.services,
                    minPrice: user.minPrice,
                    maxPrice: user.maxPrice,
                    availability: user.availability,
                    photo: user.photo,
                    note: user.note,
                };
                const token = (0, jsonwebtoken_1.sign)({ user: body }, process.env.JWT_SECRET || "thisisasecret");
                res.status(200).json({ token, user: body });
            });
        }))(req, res, next);
    }
    catch (error) {
        return next(error);
    }
});
// Get current User/Company
const current_get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        passport_1.default.authenticate("jwt", { session: false }, (error, payload) => {
            if (error) {
                return res.status(500).json({ error });
            }
            return res.status(200).json(payload);
        })(req, res, next);
    }
    catch (error) {
        return next(error);
    }
});
exports.default = {
    company_login,
    company_signUp,
    user_login,
    user_signUp,
    current_get,
};
