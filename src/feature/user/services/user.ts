import {
  type UserDoc,
  type UserModel,
} from "@supermart/supermartlib/dist/index";
import { User } from "../model/User";
import { type CreateUserDto } from "../../auth/dtos/auth.dtos";

class UserService {
  constructor(public userModel: UserModel) {}

  create = async (createUserDto: CreateUserDto): Promise<UserDoc> => {
    const createdUser = await this.userModel.create({
      userToCreate: createUserDto,
    });
    return createdUser;
  };

  findOneByEmail = async (email: string) => {
    const foundUser = await this.userModel.find({ email });
    return foundUser;
  };
}

export const userService = new UserService(User);
