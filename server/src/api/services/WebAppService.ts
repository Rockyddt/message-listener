import bodyParser from "body-parser";
import express from "express";
import { Application } from "express-serve-static-core";
import { inject, injectable } from "inversify";

import ISubscriber from "../../common/subscribers/ISubscriber";
import INotificationService from "./INotificationService";

import TYPES from "../../common/constant/Types";
import "../controllers/Controllers";

@injectable()
class WebAppService {
  private app: Application;
  private notificationService: INotificationService;
  private subscriberService: ISubscriber;
  constructor(
    @inject(TYPES.INotificationService)
    notificationService: INotificationService,
    @inject(TYPES.ISubscriber) subscriberService: ISubscriber,
  ) {
    this.notificationService = notificationService;
    this.subscriberService = subscriberService;

    const app = express();
    app.set("port", process.env.PORT || 5000);

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(this.allowAnyRequest);

    this.subscriberService.registerNotifier(notificationService);
    this.app = app;
  }

  public startSubscribe() {
    this.subscriberService.subscribe();
  }

  public getApp() {
    return this.app;
  }

  public getNotificationService() {
    return this.notificationService;
  }

  public get(name: string) {
    return this.app.get(name);
  }

  /* istanbul ignore next */
  private allowAnyRequest(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*/*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
  }
}

export default WebAppService;
