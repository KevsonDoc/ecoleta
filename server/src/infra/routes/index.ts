import { RouteAdapter } from "./adapter/RouteAdapter";
import { Route } from "./domain";
import { Router as R } from "express";

const r = R();

export class RoutesModule {
  private readonly routeAdapter: RouteAdapter;
  public readonly route: Route;

  constructor() {
    this.routeAdapter = new RouteAdapter([
      r.post("/users", (req, res) => res.json("Hello World")),
    ]);
    this.route = new Route(this.routeAdapter);
    console.log("ROUTES IS LOUDED");
  }
}
