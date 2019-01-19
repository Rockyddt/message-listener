import express from 'express';
import bodyParser from 'body-parser';
import { inject, injectable } from 'inversify';
import { Application } from 'express-serve-static-core';

import INotificationService from './INotificationService';
import ISubscriber from '../../common/subscribers/ISubscriber';
import TYPES from '../constant/Types';

import '../controllers/Controllers';

@injectable()
class App {
    private app: Application;
    private notificationService: INotificationService;

    constructor(
        @inject(TYPES.INotificationService) notificationService: INotificationService,
        @inject(TYPES.ISubscriber) subscriberService: ISubscriber ) {

        this.notificationService = notificationService;

        const app = express();
        app.set("port", process.env.PORT || 5000);

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(this.allowAnyRequest);        

        subscriberService.registerNotifier(notificationService);        
        subscriberService.subscribe();
        this.app = app;
        
    }


    allowAnyRequest(req,res,next){
        res.header("Access-Control-Allow-Origin", "*/*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");    
        next();
    }

    getApp(){
        return this.app;
    }

    getNotificationService(){
        return this.notificationService;
    }

    get(name: string) {
        return this.app.get(name);
    }
}


export default App;