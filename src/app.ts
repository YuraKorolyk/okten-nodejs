import express, { Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { IUser } from "./interfaces/user.interface";
import { User } from "./models/User.model";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      console.log(err.message);
    }
  }
);

app.get(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser[]>> => {
    try {
      const { userId } = req.params;
      const user = await User.find({ _id: userId });
      return res.json(user);
    } catch (err) {
      console.log(err.message);
    }
  }
);

app.post(
  "/users",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const createdUser = await User.create(req.body);
      return res.status(201).json(createdUser);
    } catch (err) {
      console.log(err.message);
    }
  }
);

app.delete(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<void>> => {
    try {
      const { userId } = req.params;
      const deletedUser = await User.deleteOne({ _id: userId });
      return res.json(deletedUser);
    } catch (err) {
      console.log(err.message);
    }
  }
);

app.put(
  "/users/:userId",
  async (req: Request, res: Response): Promise<Response<IUser>> => {
    try {
      const { userId } = req.params;
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { returnDocument: "after" }
      );

      return res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err.message);
    }
  }
);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`started on ${configs.PORT}`);
});
