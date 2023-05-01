import { UserEntity } from "../../entity/user";

export abstract class SaveUser {
  constructor(readonly user: UserEntity) {}

  execute() {
    //
  }
}
