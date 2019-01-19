import io from 'socket.io';
import * as log from '../../common/log';
import http from 'http';
import INotificationService from './INotificationService';
import { injectable } from 'inversify';

@injectable()
class NotificationService implements INotificationService {    
    private notificationServer;

    listen(server: http.Server){
        let ops: io.ServerOptions = {
            origins:'*:*'
        }   
        this.notificationServer = io.listen(server,ops); 
        this.notificationServer.on('connection', this.onConnected);                  
    }

    onConnected(socket){
        log.logInfo('a user connected');
        socket.on('disconnect', function(){
            log.logInfo('user disconnected');
        });
    }

    notify(data: any) {
        this.notificationServer.emit("message", data);
    }

}

export default NotificationService;