import 'reflect-metadata';
import { Container } from 'inversify';
import INotificationService from '../services/INotificationService';
import NotificationService from '../services/NotificationService';
import ISubscriber from '../../common/subscribers/ISubscriber';
import AzureEventHubs from '../../common/subscribers/AzureEventHubSubscriber';
import App from '../services/WebAppService';
import Decoder from '../../common/decoders/Decoder';
import IDecoder from '../../common/decoders/IDecoder';
import TYPES from '../../common/constant/Types';

let container = new Container();

container.bind<INotificationService>(TYPES.INotificationService).to(NotificationService).inSingletonScope();
container.bind<ISubscriber>(TYPES.ISubscriber).to(AzureEventHubs).inSingletonScope();
container.bind<IDecoder>(TYPES.IDecoder).to(Decoder).inSingletonScope();
container.bind<App>(TYPES.WebAppService).to(App).inSingletonScope();


let AppService = container.get<App>(TYPES.WebAppService)

export {container, AppService};

