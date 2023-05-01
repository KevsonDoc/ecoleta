import { UserEntity } from "../entity/user";

export interface IUserRepository {
  save(user: UserEntity): Promise<void>;
  findOneByEmail(email: string): Promise<UserEntity>;
}
