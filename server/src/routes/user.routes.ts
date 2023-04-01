import { Router as ExpressRoutes } from "express";
import { UserController } from "../controllers/user";

export class UserRoutes {
  public route: ExpressRoutes;
  private userController: UserController;

  constructor() {
    this.route = ExpressRoutes();
    this.userController = new UserController();
    this.loadUserRoutes();
  }

  private loadUserRoutes() {
    this.route.post("/", this.userController.create);
  }
}
