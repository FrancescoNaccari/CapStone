import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-websocket',
  templateUrl: './websocket.component.html',
  styleUrls: ['./websocket.component.scss']
})
export class WebsocketComponent {
  @Output() stockUpdate = new EventEmitter<any>();

  private webSocket: WebSocket;

  constructor() {
    this.webSocket = new WebSocket('ws://localhost:8080/stocks');
    this.webSocket.onmessage = (event) => {
      const stockData = JSON.parse(event.data);
      this.stockUpdate.emit(stockData);
    };
  }
}