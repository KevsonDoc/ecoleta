import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class UserController {
  public async create(_request: Request, response: Response) {
    const prisma = new PrismaClient();

    await prisma.user.create({
      data: {
        password: "123123",
        email: "asdasd",
      },
    });
    return response.status(200).json({ message: "hello world" });
  }
}
