import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
quantity: number = 1;
currentPrice: number = 0;
user: User | null = null;
private subscription: Subscription = new Subscription();

constructor(
  private authService: AuthService,
  private profiloService: ProfiloService,
  private realTimePriceService: RealTimePriceService,
  private transactionService: TransactionService,
  private activeModal: NgbActiveModal // Inject NgbActiveModal

) { }

ngOnInit(): void {
  this.authService.user$.subscribe(user => this.user = user?.user || null);

}

ngOnChanges(changes: SimpleChanges): void {
  if (changes['symbol']) {
    this.getRealTimePrice();
  }
}
validateQuantity(): void {
  if (this.quantity < 1) {
    this.quantity = 1; // Ensure the quantity is always at least 1
  }
}

getRealTimePrice(): void {
  this.subscription.add(
    this.realTimePriceService.getRealTimePrice(this.symbol).subscribe({
      next: (response) => this.currentPrice = response.price,
      error: (error) => console.error('Errore durante il recupero del prezzo in tempo reale:', error)

    })
  );
}

buyStock(): void {
  if (this.quantity <= 0) {
    window.alert('La quantità deve essere maggiore di zero.');
    return;
  }

  if (this.user && this.currentPrice * this.quantity <= this.user.balance) {
    const request: TransactionRequest = {
      userId: this.user.idUtente!,
      symbol: this.symbol,
      quantity: this.quantity,
      price: this.currentPrice
    };
    this.transactionService.buyStock(request).subscribe({
      next: (updatedUser) => {
        this.authService.updateUser(updatedUser);
        this.activeModal.close(); // Chiudi la modale in caso di successo
      },
      error: (error) => console.error('Errore durante l\'acquisto delle azioni:', error)
    });
  } else {
    console.error('Saldo insufficiente');
  }
}

sellStock(): void {
  if (this.quantity <= 0) {
    window.alert('La quantità deve essere maggiore di zero.');
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
        this.activeModal.close();
      },
      error: (error) => console.error('Errore durante la vendita delle azioni:', error)
    });
  }
}

onSubmit(): void {
  this.getRealTimePrice();
}
  }