import { Router as ExpressRoutes } from "express";
import { AuthController } from "../controllers/auth";
import { attachControllers } from "@decorators/express";

export class AuthRoutes {
  public route: ExpressRoutes;

  constructor() {
    this.route = ExpressRoutes();
    attachControllers(this.route, [AuthController]);
  }
}
