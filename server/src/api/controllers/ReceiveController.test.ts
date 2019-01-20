
import 'reflect-metadata';
import TYPES from '../../common/constant/Types';
import { Container, decorate, injectable } from 'inversify';
import ReceiveController from './ReceiveController';
import { Request, Response } from 'express';

describe('ReceiveController', ()=>{
    let controller : ReceiveController;  
    let container: Container | null;

    const notifierMock = jest.fn();
    const decodeMock = jest.fn().mockImplementation(()=>{
        return {
            body: "test"
        }
    });
    
    class NotifierMock{
        notify = notifierMock        
    }
    class DecoderMock{
        decode = decodeMock        
    }
    
    decorate(injectable(), NotifierMock);
    decorate(injectable(), DecoderMock);

    beforeEach(()=>{       
        container = new Container();        
        container.bind(TYPES.INotificationService).to(NotifierMock);
        container.bind(TYPES.IDecoder).to(DecoderMock);

        controller = new ReceiveController(container.get(TYPES.INotificationService), container.get(TYPES.IDecoder));    
    });   

    describe('receive', ()=>{        
        test('receive new message should decode and notify', async ()=>{
            let request = {body:{body:"test"}} as Request;
            let response = {send: ()=>{}} as Response;

            await controller.receive( request, response); 

            expect(notifierMock.mock.calls.length).toBe(1);
            expect(decodeMock.mock.calls.length).toBe(1);
        });        
    });   


    afterEach(() => {
        container = null;
    });

});
