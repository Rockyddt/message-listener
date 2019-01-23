import dgram from "dgram";
import * as log from "../common/log";

import { AddressInfo } from "net";
import { AppService } from "./ioc/Ioc";
import UdpAppService from "./services/UdpAppService";

class Server {
    private server: dgram.Socket;
    private appService: UdpAppService;

    constructor(appService: UdpAppService) {
        this.server = dgram.createSocket("udp4");
        this.appService = appService;
        this.init();
    }

    public init() {
        this.server.on("listening", this.onListening);
        this.server.on("error", this.onError);
        this.server.on("message", this.onMessage);
        this.server.bind(20500);
    }

    public onListening = () => {
        const address: any = this.server.address();
        log.logInfo(`server listening ${address.address}:${address.port}`);
    }

    public onError = (err) => {
        log.logInfo(`server error:\n${err.stack}`);
        this.server.close();
    }

    public onMessage = async (msg: Buffer, remote: AddressInfo) => {
        const response = await this.appService.handleMessage(msg);
        log.logInfo(`server got: ${msg} from ${remote.address}:${remote.port}`);

        this.server.send(response, 0, response.length, remote.port, remote.address, (err) => {
            if (err) {
                throw err;
            } else {
                log.logInfo("OK sent to client");
            }
        });
    }
}

export default new Server(AppService);
