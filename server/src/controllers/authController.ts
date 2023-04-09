import { Request, Response, NextFunction } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { genSaltSync, hashSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import Company from "../models/Company";
import User from "../models/User";

// get env variables
dotenv.config();

// Sign up company
const company_signUp = [
  body("name").isLength({ min: 1 }).withMessage("Company name is required."),
  body("type").isLength({ min: 1 }).withMessage("Company type is required."),
  body("person_first_name")
    .isLength({ min: 1 })
    .withMessage("Person's first name is required."),
  body("person_last_name")
    .isLength({ min: 1 })
    .withMessage("Person's last name is required."),
  body("person_status")
    .isLength({ min: 1 })
    .withMessage("Person's status is required."),
  body("city").isLength({ min: 1 }).withMessage("City is required."),
  body("sector").isLength({ min: 1 }).withMessage("Sector is required."),
  body("phone").isLength({ min: 1 }).withMessage("Phone is required."),
  body("email").isLength({ min: 1 }).withMessage("Email is required."),
  body("activity").isLength({ min: 1 }).withMessage("Activity is required."),
  body("password").isLength({ min: 1 }).withMessage("Password is required."),
  body("password_confirmation")
    .exists()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match.");
      }
      return true;
    }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      const salt = genSaltSync(10);
      const passwordHash = hashSync(req.body.password, salt);
      const company = new Company({
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
      const existant = await Company.findOne({ email: req.body.email });

      if (existant) {
        return res
          .status(500)
          .json({ message: "Cet email est déja existant !" });
      }

      // save company
      await company.save();

      // login user automatically
      passport.authenticate(
        "company-local",
        { session: false },
        async (error: any, company: any, info: any) => {
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

            const token = sign(
              { company: body },
              process.env.JWT_SECRET || "thisisasecret"
            );
            res.status(200).json({ token, company: body });
          });
        }
      )(req, res, next);
    } catch (error) {
      return next(error);
    }
  },
];

// login company
const company_login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    passport.authenticate(
      "company-local",
      { session: false },
      async (error: any, company: any, info: any) => {
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

          const token = sign(
            { company: body },
            process.env.JWT_SECRET || "thisisasecret"
          );
          res.status(200).json({ token, company: body });
        });
      }
    )(req, res, next);
  } catch (error) {
    return next(error);
  }
};

// Sign up user
const user_signUp = [
  body("first_name")
    .isLength({ min: 1 })
    .withMessage("First name is required."),
  body("last_name").isLength({ min: 1 }).withMessage("Last name is required."),
  body("service").exists().withMessage("Service are required."),
  body("city").isLength({ min: 1 }).withMessage("City is required."),
  body("sector").isLength({ min: 1 }).withMessage("Sector is required."),
  body("phone").isLength({ min: 1 }).withMessage("Phone is required."),
  body("birth_date").exists().withMessage("Birth date is required."),
  body("availability").exists().withMessage("Availability is required."),
  body("min_price").exists().withMessage("Min price is required."),
  body("max_price").exists().withMessage("Max price is required."),
  body("password").isLength({ min: 1 }).withMessage("Password is required."),
  body("password_confirmation")
    .exists()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match.");
      }
      return true;
    }),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      const salt = genSaltSync(10);
      const passwordHash = hashSync(req.body.password, salt);
      const user = new User({
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
      const existant = await User.findOne({ phone: req.body.phone });

      if (existant) {
        return res
          .status(500)
          .json({ message: "Numéro de téléphone est déja existant !" });
      }

      // save user
      await user.save();

      // login user automatically
      passport.authenticate(
        "user-local",
        { session: false },
        async (error: any, user: any, info: any) => {
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

            const token = sign(
              { user: body },
              process.env.JWT_SECRET || "thisisasecret"
            );
            res.status(200).json({ token, user: body });
          });
        }
      )(req, res, next);
    } catch (error) {
      return next(error);
    }
  },
];

// Login user
const user_login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate(
      "user-local",
      { session: false },
      async (error: any, user: any, info: any) => {
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

          const token = sign(
            { user: body },
            process.env.JWT_SECRET || "thisisasecret"
          );
          res.status(200).json({ token, user: body });
        });
      }
    )(req, res, next);
  } catch (error) {
    return next(error);
  }
};

// Get current User/Company
const current_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    passport.authenticate(
      "jwt",
      { session: false },
      (error: any, payload: any) => {
        if (error) {
          return res.status(500).json({ error });
        }
        return res.status(200).json(payload);
      }
    )(req, res, next);
  } catch (error) {
    return next(error);
  }
};

export default {
  company_login,
  company_signUp,
  user_login,
  user_signUp,
  current_get,
};
