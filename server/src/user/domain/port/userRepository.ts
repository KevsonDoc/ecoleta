import { UserEntity } from "../entity/user";

export interface UserRepository {
  save(user: UserEntity): string;
}
