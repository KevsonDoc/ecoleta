import { Router } from "express";
import { IRoute } from "../port/IRoute";

export class Route implements IRoute {
  constructor(private readonly routesAdapter: IRoute) {}

  load(): Router {
    return this.routesAdapter.load();
  }
}
