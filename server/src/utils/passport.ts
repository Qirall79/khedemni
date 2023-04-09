import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { hashSync, compare } from "bcryptjs";
import User from "../models/User";
import Company from "../models/Company";
import dotenv from "dotenv";

dotenv.config();

// user's local strategy
passport.use(
  "user-local",
  new LocalStrategy(
    {
      usernameField: "phone",
      passwordField: "password",
    },
    async (username: string, password: string, done: any) => {
      try {
        const user = await User.findOne({ phone: username });

        // check if user exists
        if (!user) {
          return done(null, false, {
            message: "Cet utilisateur n'existe pas !",
          });
        }

        // check password
        const isMatch: boolean = await compare(password, user.password);
        if (!isMatch) {
          return done(null, false, {
            message: "Le mot de passe est incorrect !",
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// company's local strategy
passport.use(
  "company-local",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username: string, password: string, done: any) => {
      try {
        const company = await Company.findOne({ email: username });

        // check if company exists
        if (!company) {
          return done(null, false, {
            message: "Cet utilisateur n'existe pas !",
          });
        }

        // check password
        const isMatch: boolean = await compare(password, company.password);
        if (!isMatch) {
          return done(null, false, {
            message: "Le mot de passe est incorrect !",
          });
        }

        return done(null, company);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// jwt strategy
passport.use(
  "jwt",
  new JwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET || "thisisasecret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        return done(null, payload);
      } catch (error) {
        return done(error);
      }
    }
  )
);
