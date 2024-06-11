import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  [x: string]: any;
  // Definisci l'URL del server WebSocket
  private socket = webSocket('http://localhost:8080/topic/stocks');

  constructor() { }

  // Metodo per connettersi al server WebSocket
  connect() {
    return this.socket;
  }
}
