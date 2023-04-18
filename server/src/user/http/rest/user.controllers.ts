import { Injectable } from "@decorators/di";
import { Controller, Post, Response } from "@decorators/express";
import { PrismaClient } from "@prisma/client";
import { Response as IResponse } from "express";

@Controller("/user")
@Injectable()
export class AuthController {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  @Post("/sign")
  public sign(@Response() response: IResponse) {
    return response.status(200).json({ message: "Hello World" });
  }
}
