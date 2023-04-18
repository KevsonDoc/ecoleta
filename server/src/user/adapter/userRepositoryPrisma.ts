import { UserEntity } from "user/domain/entity/user";
import { UserRepository } from "../domain/port/userRepository";
import { PrismaClient } from "@prisma/client";

export abstract class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  save(user: UserEntity): string {
    throw new Error("Method not implemented.");
  }
}
