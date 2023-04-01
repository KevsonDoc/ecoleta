import { errors } from "celebrate";
import cors from "cors";
import express, { Application, Router } from "express";
import path from "path";
import { Routes } from "./routes/index.routes";

export class Server {
  private app: Application;
  private routes: Routes;

  constructor() {
    this.app = express();
    this.routes = new Routes();
  }

  public run() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads")),
    );
    this.app.use(errors());
    this.app.use("/api", this.routes.routes);
    this.app.listen(3333, () =>
      console.log("\n============ || SERVER IS RUNNING || ============\n"),
    );
  }
}
