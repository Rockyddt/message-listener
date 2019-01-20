
import ISubscriber from "./ISubscriber";
import AzureEventHubSubscriber from "./AzureEventHubSubscriber";
import { EventProcessorHost } from "@azure/event-processor-host";

jest.mock('@azure/event-hubs')

describe('AzureEventHubSubscriber', ()=>{
    let subscriber : ISubscriber;  
    let mockProcessor = jest.fn().mockImplementation(async (onMessage, onError) =>{
        await onMessage({
            partitionId:0
        },{
            body: "test"
        });      
    });

    beforeEach(()=>{            
        EventProcessorHost.createFromConnectionString = jest.fn().mockImplementation(() => {
            return {
                start: mockProcessor                
            };
        });       
        subscriber = new AzureEventHubSubscriber();
        mockProcessor.mockClear();
    });   

    describe('subscribe', ()=>{        
        test('should start receiving data', ()=>{            
            expect(subscriber).toBeInstanceOf(AzureEventHubSubscriber);
            subscriber.subscribe();
            expect(mockProcessor.mock.calls.length).toBe(1);
        });

        test('should call notifier when received data', async ()=>{   
            let mockNotifier = {
                notify: jest.fn()
            };         
            subscriber.registerNotifier(mockNotifier);
            await subscriber.subscribe();
            let numberOfCalls = mockNotifier.notify.mock.calls.length;
            expect(numberOfCalls).toBe(1);
        });
    });

    describe('register', ()=>{        
        test('should have no error', ()=>{                            
            expect(subscriber.registerNotifier).not.toThrowError();
        });
    });

});