import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/service/web-socket.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
stocks: any;
  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.subscribeToStockUpdates();
  }

  subscribeToStockUpdates() {
    const socket = this.websocketService.connect();
    socket.subscribe(
      (data: any) => {
        // Gestisci i dati ricevuti dal server WebSocket
        console.log(data);
      },
      (error: any) => {
        // Gestisci gli errori della connessione WebSocket
        console.error(error);
      }
    );
  }
}
