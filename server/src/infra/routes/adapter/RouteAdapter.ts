import { Router } from "express";
import { IRoute } from "../port/IRoute";

export class RouteAdapter implements IRoute {
  private route: Router;

  constructor(private routes: Router[]) {
    this.route = Router();
  }

  load(): Router {
    this.routes.map((routeItem) => this.route.use(routeItem));
    return this.route.use("/api", this.route);
  }
}
