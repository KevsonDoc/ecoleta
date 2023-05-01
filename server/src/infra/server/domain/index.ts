import { IServer } from "../port/IServer";

export class Server implements IServer {
  constructor(private readonly serverAdapter: IServer) {}

  async start(): Promise<void> {
    await this.serverAdapter.start();
    console.log("SERVER IS RUNNING");
  }
}
