
import 'reflect-metadata';
import WebAppService from "./WebAppService";
import TYPES from "../../common/constant/Types";
import { Container, decorate, injectable } from "inversify";

describe('WebAppService', ()=>{
    let appService : WebAppService;  
    let container: Container | null;

    const notificationMock = jest.fn();
    const subscriberMock = jest.fn();
    const registerMock = jest.fn();
    const listenMock = jest.fn();

    class NotificationMock{
        notify = notificationMock
        listen = listenMock
    }
    class SubscriberMock{
        registerNotifier = registerMock
        subscribe = subscriberMock
    }
    
    decorate(injectable(), NotificationMock);
    decorate(injectable(), SubscriberMock);

    beforeEach(()=>{       
        container = new Container();        
        container.bind(TYPES.INotificationService).to(NotificationMock);
        container.bind(TYPES.ISubscriber).to(SubscriberMock);
        container.bind<WebAppService>(TYPES.WebAppService).to(WebAppService); 
        appService = container.get<WebAppService>(TYPES.WebAppService);    
    });   

    describe('startSubscribe', ()=>{        
        test('subscriber should be called', async ()=>{
            appService.startSubscribe();                  
            expect(registerMock.mock.calls.length).toBe(1);
            expect(subscriberMock.mock.calls.length).toBe(1);
        });        
    });

    describe('getNotificationService', ()=>{        
        test('return notification service', async ()=>{
            let notifier = appService.getNotificationService();                              
            expect(notifier.listen).toEqual(listenMock);            
        });        
    });

    describe('get', ()=>{        
        test('port should be 5000', async ()=>{            
            expect(appService.get("port")).toEqual(5000);            
        });        
    });

    describe('getApp', ()=>{        
        test('should throw no error', async ()=>{                  
            expect(()=>{
                appService.getApp();  
            }).not.toThrowError();            
        });        
    });


    afterEach(() => {
        container = null;
    });

});
