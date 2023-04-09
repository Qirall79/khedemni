import { Request, Response, NextFunction } from "express";
import User from "../models/User";

const users_all = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
};

const user_get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "L'utilisateur n'existe plus.",
      });
    }
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};

export default {
  users_all,
  user_get,
};
