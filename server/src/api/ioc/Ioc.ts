import { Container } from "inversify";
import "reflect-metadata";
import TYPES from "../../common/constant/Types";
import Decoder from "../../common/decoders/Decoder";
import IDecoder from "../../common/decoders/IDecoder";
import AzureEventHubs from "../../common/subscribers/AzureEventHubSubscriber";
import ISubscriber from "../../common/subscribers/ISubscriber";
import INotificationService from "../services/INotificationService";
import NotificationService from "../services/NotificationService";
import App from "../services/WebAppService";

const container = new Container();

container
  .bind<INotificationService>(TYPES.INotificationService)
  .to(NotificationService)
  .inSingletonScope();
container
  .bind<ISubscriber>(TYPES.ISubscriber)
  .to(AzureEventHubs)
  .inSingletonScope();
container
  .bind<IDecoder>(TYPES.IDecoder)
  .to(Decoder)
  .inSingletonScope();
container
  .bind<App>(TYPES.WebAppService)
  .to(App)
  .inSingletonScope();

const AppService = container.get<App>(TYPES.WebAppService);

export { container, AppService };
