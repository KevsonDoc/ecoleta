import { Router as ExpressRoutes, Request, Response } from "express";
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
    this.routes.use("/auth", this.authRoutes.route);
    this.routes.use("/user", this.userRoutes.route);
    this.routes.get("/", (_request: Request, response: Response) => {
      return response.status(200).json({
        message: "Hello World",
      });
    });
  }
}
