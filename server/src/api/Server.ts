import "reflect-metadata";
import * as http from "http";
import { InversifyExpressServer } from "inversify-express-utils";
import * as log from "../common/log";
import { AppService, container } from "./ioc/Ioc";
import WebAppService from "./services/WebAppService";

class Server {
  constructor(app: WebAppService) {
    const server = new InversifyExpressServer(container, null, null, app.getApp());
    server.build();

    const notificationService = app.getNotificationService();

    const httpServer = http.createServer(app.getApp());
    notificationService.listen(httpServer);

    httpServer.listen(app.get("port"), () => {
      const msg = `App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`;
      log.logInfo(msg);
      app.startSubscribe();
    });
  }
}

export default new Server(AppService);
