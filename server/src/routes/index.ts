import { Router as ExpressRoutes } from "express";
import { AuthRoutes } from "./auth.routes";
import { UserRoutes } from "./user.routes";

export class Routes {
  public routes: ExpressRoutes;
  private authRoutes: AuthRoutes;
  private userRoutes: UserRoutes;

  constructor() {
    this.routes = ExpressRoutes();
    this.authRoutes = new AuthRoutes();
    this.userRoutes = new UserRoutes();
    this.routes.use(this.authRoutes.route);
    this.routes.use(this.userRoutes.route);
  }
}
