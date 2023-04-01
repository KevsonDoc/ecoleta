import { Server } from "./server";
class App {
  private server: Server;

  constructor() {
    this.server = new Server();
  }

  start() {
    this.server.run();
  }
}

new App().start();
