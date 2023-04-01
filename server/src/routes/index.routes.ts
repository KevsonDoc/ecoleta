import { Router as ExpressRoutes, IRouter, Request, Response } from "express";

export class Routes {
  public routes: IRouter;

  constructor() {
    this.routes = ExpressRoutes();
    this.routes.get("/", (_request: Request, response: Response) => {
      return response.status(200).json({
        message: "Hello World",
      });
    });
  }
}
