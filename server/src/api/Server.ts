import 'reflect-metadata';
import WebAppService from './services/WebAppService';
import * as log from '../common/log';
import * as http from 'http';
import {container, AppService} from './ioc/Ioc';
import { InversifyExpressServer } from 'inversify-express-utils';

class Server {
    constructor(app: WebAppService){        
                
        let server = new InversifyExpressServer(container, null, null, app.getApp());
        server.build();

        const notificationService = app.getNotificationService();   

        const httpServer = http.createServer(app.getApp());
        notificationService.listen(httpServer);                

        httpServer.listen(app.get("port"), () => {
            var msg = `App is running at http://localhost:${app.get("port")} in ${app.get("env")} mode`;
            log.logInfo(msg);	
            app.startSubscribe();
        });
    }
}



export default new Server(AppService);