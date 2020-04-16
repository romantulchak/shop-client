import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

const SOCKET = environment.webSocket;


var SockJs = require("sockjs-client");
var Stomp = require("stompjs");




@Injectable({
    providedIn:'root'
})
export class WebSocketService{
    public connect(){
        let socket = new SockJs(SOCKET);
        let stompClient = Stomp.over(socket);
        return stompClient;
    }
}