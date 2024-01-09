/* eslint-disable @typescript-eslint/naming-convention */
import mongoose from "mongoose";
import {
  type UserDoc,
  type UserModel,
} from "@supermart/supermartlib/dist/index";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(_, ret) {
        ret.id = ret._id as string;
        delete ret.v;
        delete ret.password;
      },
    },
  },
);

export const User = mongoose.model<UserDoc, UserModel>(
  "User",
  UserSchema,
  "users",
);
