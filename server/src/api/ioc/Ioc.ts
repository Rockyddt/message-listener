import 'reflect-metadata';
import { Container } from 'inversify';
import TYPES from '../constant/Types';
import INotificationService from '../services/INotificationService';
import NotificationService from '../services/NotificationService';
import ISubscriber from '../../common/subscribers/ISubscriber';
import AzureEventHubs from '../../common/subscribers/AzureEventHubs';
import App from '../services/App';
import Decoder from '../../common/decoders/Decoder';
import IDecoder from '../../common/decoders/IDecoder';

let container = new Container();

container.bind<INotificationService>(TYPES.INotificationService).to(NotificationService).inSingletonScope();
container.bind<ISubscriber>(TYPES.ISubscriber).to(AzureEventHubs).inSingletonScope();
container.bind<IDecoder>(TYPES.IDecoder).to(Decoder).inSingletonScope();
container.bind<App>(TYPES.AppService).to(App).inSingletonScope();


let AppService = container.get<App>(TYPES.AppService)

export {container, AppService};

