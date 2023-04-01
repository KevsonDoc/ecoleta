import { Router as ExpressRoutes } from "express";
import { AuthController } from "../controllers/auth";

export class AuthRoutes {
  public route: ExpressRoutes;
  private authController: AuthController;

  constructor() {
    this.route = ExpressRoutes();
    this.authController = new AuthController();
    this.loadAuthRoutes();
  }

  private loadAuthRoutes() {
    this.route.get("/sign", this.authController.sign);
  }
}
