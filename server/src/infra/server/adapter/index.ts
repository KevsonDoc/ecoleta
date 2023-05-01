import cors from "cors";
import express, { Express, Router } from "express";
import { IServer } from "../port/IServer";
import { ENV } from "const/env";

export class ServerAdapter implements IServer {
  private readonly app: Express;

  constructor(private readonly routes: Router) {
    this.app = express();
  }

  async start(): Promise<void> {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(this.routes);
    this.app.listen(ENV.PORT);
  }
}
