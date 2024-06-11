import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebsocketService } from './service/web-socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  stockSubscription!: Subscription;
  stockData: any;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit() {
    // Connetti al server WebSocket e salva l'istanza del WebSocket
    const socket = this.websocketService.connect();

    // Sottoscrivi agli aggiornamenti degli stock
    this.stockSubscription = socket.subscribe((data) => {
      this.stockData = data;
      // Aggiorna l'UI con i nuovi dati sugli stock
    });
  }

  ngOnDestroy() {
    // Scollega la sottoscrizione alla disconnessione
    this.stockSubscription.unsubscribe();
  }
}
