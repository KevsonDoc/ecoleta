import { RoutesModule } from "@infra/routes";
import { ServerAdapter } from "./adapter";
import { Server } from "./domain";
import { IServer } from "./port/IServer";

export class ServerModule implements IServer {
  private serverAdapter: ServerAdapter;
  private server: Server;
  private routeModule: RoutesModule;

  constructor() {
    this.routeModule = new RoutesModule();
    this.serverAdapter = new ServerAdapter(this.routeModule.route.load());
    this.server = new Server(this.serverAdapter);
  }

  async start(): Promise<void> {
    this.server.start();
  }
}
