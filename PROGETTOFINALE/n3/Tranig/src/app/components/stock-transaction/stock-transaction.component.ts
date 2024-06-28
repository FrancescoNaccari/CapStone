import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, interval } from 'rxjs';import { Stock } from 'src/app/interface/stock.interface';
import { TransactionRequest } from 'src/app/interface/transaction-request.interface';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-stock-transaction',
  templateUrl: './stock-transaction.component.html',
  styleUrls: ['./stock-transaction.component.scss']
})
export class StockTransactionComponent implements OnInit, OnChanges {
//   @Input() price: number | undefined;
//   @Input() symbol: string = '';
//   @Input() balance: number = 0;
//   @Input() userId: number | null = null;
//   @Output() balanceUpdated = new EventEmitter<number>();
//   @Input() stocks:Stock[] = [];
//   @Output() stocksUpdated = new EventEmitter<Stock[]>();
//   quantityToBuy: number = 1;
//   quantityToSell: number = 1;
//   ownedQuantity: number = 0;

//   private intervalSubscription!: Subscription;


//   constructor(
//     private transactionService: TransactionService,
//     private authSrv: AuthService,
//     private profiloService: ProfiloService 
//   ) { }
//   ngOnInit(): void {
//     this.updateOwnedQuantity();
//     this.intervalSubscription = interval(3000).subscribe(() => this.updateOwnedQuantity());

//     }
   

//     ngOnChanges():void{
//       this.updateOwnedQuantity();
//     }
//  ngOnDestroy(): void {
//       if (this.intervalSubscription) {
//         this.intervalSubscription.unsubscribe();
//       }
//     }
//     updateOwnedQuantity(){
//       const stock = this.stocks.find(s => s.symbol === this.symbol);
//       this.ownedQuantity = stock ? stock.quantity : 0;
//     }

//     buyStock(): void {
//       if (this.price !== undefined && this.userId !== null) {
//         const request: TransactionRequest = {
//           userId: this.userId,
//           symbol: this.symbol,
//           quantity: this.quantityToBuy,
//           price: this.price
//         };
  
//         const cost = this.price * this.quantityToBuy;
//         if (this.balance >= cost) {
//           this.transactionService.buyStock(request).subscribe(
//             (response: User) => {
//               if (response && response.balance !== undefined) {
//                 this.profiloService.updateBalance(this.userId!, response.balance).subscribe(updatedUser => {
//                   this.authSrv.updateUser(updatedUser);
//                   this.balance = updatedUser.balance || 0;
//                   this.balanceUpdated.emit(this.balance);
//                   this.stocksUpdated.emit(updatedUser.stocks); // Emetti l'evento stocksUpdated
//                   this.updateOwnedQuantity();
//                   window.alert('Acquisto effettuato con successo');
//                 });
//               } else {
//                 console.error('Risposta del server non valida', response);
//                 window.alert('Errore durante l\'acquisto delle azioni');
//               }
//             },
//             (error) => {
//               console.error('Errore durante l\'acquisto delle azioni', error);
//               if (error.status === 400) {
//                 window.alert('Saldo insufficiente per completare l\'acquisto');
//               } else {
//                 window.alert('Errore durante l\'acquisto delle azioni');
//               }
//             }
//           );
//         } else {
//           window.alert('Saldo insufficiente per completare l\'acquisto');
//         }
//       } else {
//         if (this.price === undefined) {
//           console.warn('Prezzo non disponibile');
//         }
//         if (this.userId === null) {
//           console.warn('Utente non autenticato');
//         }
//         window.alert('Prezzo non disponibile o utente non autenticato, impossibile completare l\'acquisto');
//       }
//     }
  
//     sellStock(): void {
//       if (this.price !== undefined && this.userId !== null) {
//         const request: TransactionRequest = {
//           userId: this.userId,
//           symbol: this.symbol,
//           quantity: this.quantityToSell,
//           price: this.price
//         };
  
//         this.transactionService.sellStock(request).subscribe(
//           (response: User) => {
//             if (response && response.balance !== undefined) {
//               this.profiloService.updateBalance(this.userId!, response.balance).subscribe(updatedUser => {
//                 this.authSrv.updateUser(updatedUser);
//                 this.balance = updatedUser.balance || 0;
//                 this.balanceUpdated.emit(this.balance);
//                 this.stocksUpdated.emit(updatedUser.stocks); // Emetti l'evento stocksUpdated
//                 this.updateOwnedQuantity();
//                 window.alert('Vendita effettuata con successo');
//               });
//             } else {
//               console.error('Risposta del server non valida', response);
//               window.alert('Errore durante la vendita delle azioni');
//             }
//           },
//           (error) => {
//             console.error('Errore durante la vendita delle azioni', error);
//             window.alert('Errore durante la vendita delle azioni');
//           }
//         );
//       } else {
//         if (this.price === undefined) {
//           console.warn('Prezzo non disponibile');
//         }
//         if (this.userId === null) {
//           console.warn('Utente non autenticato');
//         }
//         window.alert('Prezzo non disponibile o utente non autenticato, impossibile completare la vendita');
//       }
//     }

  @Input() symbol: string = ''
  @Input() currentPrice: number = 0;
  @Input() userId: number | null = null;
  @Output() transactionUpdated = new EventEmitter<void>();
  quantity: number = 1;
  balance: number = 0;
  ownedQuantity: number = 0; // Variabile per il numero di azioni possedute

 user: User | null = null;
 private subscription: Subscription = new Subscription();
 alertMessage: string | null = null;
 isPriceLoaded: boolean = false; 
 constructor(
   private authService: AuthService,
   private profiloService: ProfiloService,
   private realTimePriceService: RealTimePriceService,
   private transactionService: TransactionService,
   private activeModal: NgbActiveModal, // Inject NgbActiveModal
 
 ) { }

ngOnInit(): void {
  this.authService.user$.subscribe((data) => {
    this.user = data?.user || null;
    this.balance = this.user?.balance || 0; // Assicurarsi che il saldo sia aggiornato
    this.updateOwnedQuantity(); // Aggiorna il numero di azioni possedute

  });
  this.getRealTimePrice();
}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['symbol']) {
    this.getRealTimePrice();
    this.updateOwnedQuantity();

  }
}
validateQuantity(): void {
  if (this.quantity < 1) {
    this.quantity = 1; // Ensure the quantity is always at least 1
  }
}
showAlert(message: string): void {
  this.alertMessage = message;
  setTimeout(() => {
    this.onAlertClose();
  }, 2000); // Chiudi l'alert e la modale dopo 2 secondi
}

onAlertClose(): void {
  this.alertMessage = null;
  this.activeModal.close();
}

getRealTimePrice(): void {
  this.isPriceLoaded = false; // Inizia il caricamento del prezzo
  this.subscription.add(
    this.realTimePriceService.getRealTimePrice(this.symbol).subscribe({
      next: (response) => {
        this.currentPrice = response.price;
        this.isPriceLoaded = true; // Imposta il caricamento del prezzo come completato
      },
      error: (error) => console.error('Errore durante il recupero del prezzo in tempo reale:', error)
    })
  );
}


updateOwnedQuantity(): void {
  // Logica per ottenere il numero di azioni possedute dall'utente per il simbolo specifico
  // Esempio fittizio, sostituire con la logica appropriata per il proprio contesto
  const ownedStock = this.user?.stocks?.find(stock => stock.symbol === this.symbol);
  this.ownedQuantity = ownedStock ? ownedStock.quantity : 0;
}
buyStock(): void {
  if (this.quantity <= 0) {
    alert('La quantità deve essere maggiore di zero.');
    return;
  }

  if (!this.isPriceLoaded || this.currentPrice === 0) {
    alert('Errore: Il prezzo non è stato caricato correttamente.');
    return;
  }

  if (this.user && this.currentPrice * this.quantity <= this.balance) {
    const request: TransactionRequest = {
      userId: this.user.idUtente!,
      symbol: this.symbol,
      quantity: this.quantity,
      price: this.currentPrice
    };
    this.transactionService.buyStock(request).subscribe({
      next: (updatedUser) => {
        this.authService.updateUser(updatedUser);
        this.transactionUpdated.emit();
        this.showAlert('Acquisto effettuato con successo'); // Mostra l'alert
      },
      error: (error) => console.error('Errore durante l\'acquisto delle azioni:', error)
    });
  } else {
    console.error('Saldo insufficiente');
  }
}

sellStock(): void {
  if (this.quantity <= 0) {
    alert('La quantità deve essere maggiore di zero.');
    return;
  }

  if (!this.isPriceLoaded || this.currentPrice === 0) {
    alert('Errore: Il prezzo non è stato caricato correttamente.');
    return;
  }

  if (this.user) {
    const request: TransactionRequest = {
      userId: this.user.idUtente!,
      symbol: this.symbol,
      quantity: this.quantity,
      price: this.currentPrice
    };
    this.transactionService.sellStock(request).subscribe({
      next: (updatedUser) => {
        this.authService.updateUser(updatedUser);
        this.transactionUpdated.emit();
        this.showAlert('Vendita effettuata con successo'); // Mostra l'alert
      },
      error: (error) => console.error('Errore durante la vendita delle azioni:', error)
    });
  }
}


onSubmit(): void {
  this.getRealTimePrice();
}
  }