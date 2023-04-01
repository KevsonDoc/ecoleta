import { errors } from "celebrate";
import cors from "cors";
import express, { Application } from "express";
import path from "path";
import { Routes } from "./routes/index.routes";

export class Server {
  private app: Application;
  private appRoutes: Routes;

  constructor() {
    this.app = express();
    this.appRoutes = new Routes();
  }

  public run() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads")),
    );
    this.app.use(errors());
    this.app.use("/api", this.appRoutes.routes);
    this.app.listen(3333, () =>
      console.log("\n============ || SERVER IS RUNNING || ============\n"),
    );
  }
}
