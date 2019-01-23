import http from "http";
import { injectable } from "inversify";
import io from "socket.io";
import * as log from "../../common/log";
import INotifier from "../../common/subscribers/INotifier";
import INotificationService from "./INotificationService";

@injectable()
class NotificationService implements INotificationService, INotifier {
    private notificationServer;

    public listen(server: http.Server) {
        const ops: io.ServerOptions = {
            origins: "*:*",
        };
        this.notificationServer = io.listen(server, ops);
        this.notificationServer.on("connection", this.onConnected);
    }

    public onConnected(socket) {
        log.logInfo("a user connected");
        socket.on("disconnect", () => {
            log.logInfo("user disconnected");
        });
    }

    public notify(data: any) {
        this.notificationServer.emit("message", data);
    }

}

export default NotificationService;
