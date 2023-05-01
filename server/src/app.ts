import { ServerModule } from "infra/server";

class App {
  private serverModule: ServerModule;

  constructor() {
    this.serverModule = new ServerModule();
  }

  start() {
    this.serverModule.start();
  }
}

export const app = new App();
