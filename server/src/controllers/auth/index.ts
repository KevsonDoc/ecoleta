import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

export class AuthController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public sign(_request: Request, response: Response) {
    return response.status(200).json({ message: "hello world" });
  }
}
