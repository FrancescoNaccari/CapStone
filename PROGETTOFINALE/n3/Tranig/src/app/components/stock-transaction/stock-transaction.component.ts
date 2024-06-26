import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';import { Stock } from 'src/app/interface/stock.interface';
import { TransactionRequest } from 'src/app/interface/transaction-request.interface';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-stock-transaction',
  templateUrl: './stock-transaction.component.html',
  styleUrls: ['./stock-transaction.component.scss']
})
export class StockTransactionComponent implements OnInit, OnDestroy , OnChanges {
  @Input() price: number | undefined;
  @Input() symbol: string = '';
  @Input() balance: number = 0;
  @Input() userId: number | null = null;
  @Output() balanceUpdated = new EventEmitter<number>();
  @Input() stocks:Stock[] = [];
  @Output() stocksUpdated = new EventEmitter<Stock[]>();
  quantityToBuy: number = 1;
  quantityToSell: number = 1;
  ownedQuantity: number = 0;

  private intervalSubscription!: Subscription;


  constructor(
    private transactionService: TransactionService,
    private authSrv: AuthService,
    private profiloService: ProfiloService 
  ) { }
  ngOnInit(): void {
    this.updateOwnedQuantity();
    this.intervalSubscription = interval(3000).subscribe(() => this.updateOwnedQuantity());

    }
   

    ngOnChanges():void{
      this.updateOwnedQuantity();
    }
 ngOnDestroy(): void {
      if (this.intervalSubscription) {
        this.intervalSubscription.unsubscribe();
      }
    }
    updateOwnedQuantity(){
      const stock = this.stocks.find(s => s.symbol === this.symbol);
      this.ownedQuantity = stock ? stock.quantity : 0;
    }

    buyStock(): void {
      if (this.price !== undefined && this.userId !== null) {
        const request: TransactionRequest = {
          userId: this.userId,
          symbol: this.symbol,
          quantity: this.quantityToBuy,
          price: this.price
        };
  
        const cost = this.price * this.quantityToBuy;
        if (this.balance >= cost) {
          this.transactionService.buyStock(request).subscribe(
            (response: User) => {
              if (response && response.balance !== undefined) {
                this.profiloService.updateBalance(this.userId!, response.balance).subscribe(updatedUser => {
                  this.authSrv.updateUser(updatedUser);
                  this.balance = updatedUser.balance || 0;
                  this.balanceUpdated.emit(this.balance);
                  this.stocksUpdated.emit(updatedUser.stocks); // Emetti l'evento stocksUpdated
                  this.updateOwnedQuantity();
                  window.alert('Acquisto effettuato con successo');
                });
              } else {
                console.error('Risposta del server non valida', response);
                window.alert('Errore durante l\'acquisto delle azioni');
              }
            },
            (error) => {
              console.error('Errore durante l\'acquisto delle azioni', error);
              if (error.status === 400) {
                window.alert('Saldo insufficiente per completare l\'acquisto');
              } else {
                window.alert('Errore durante l\'acquisto delle azioni');
              }
            }
          );
        } else {
          window.alert('Saldo insufficiente per completare l\'acquisto');
        }
      } else {
        if (this.price === undefined) {
          console.warn('Prezzo non disponibile');
        }
        if (this.userId === null) {
          console.warn('Utente non autenticato');
        }
        window.alert('Prezzo non disponibile o utente non autenticato, impossibile completare l\'acquisto');
      }
    }
  
    sellStock(): void {
      if (this.price !== undefined && this.userId !== null) {
        const request: TransactionRequest = {
          userId: this.userId,
          symbol: this.symbol,
          quantity: this.quantityToSell,
          price: this.price
        };
  
        this.transactionService.sellStock(request).subscribe(
          (response: User) => {
            if (response && response.balance !== undefined) {
              this.profiloService.updateBalance(this.userId!, response.balance).subscribe(updatedUser => {
                this.authSrv.updateUser(updatedUser);
                this.balance = updatedUser.balance || 0;
                this.balanceUpdated.emit(this.balance);
                this.stocksUpdated.emit(updatedUser.stocks); // Emetti l'evento stocksUpdated
                this.updateOwnedQuantity();
                window.alert('Vendita effettuata con successo');
              });
            } else {
              console.error('Risposta del server non valida', response);
              window.alert('Errore durante la vendita delle azioni');
            }
          },
          (error) => {
            console.error('Errore durante la vendita delle azioni', error);
            window.alert('Errore durante la vendita delle azioni');
          }
        );
      } else {
        if (this.price === undefined) {
          console.warn('Prezzo non disponibile');
        }
        if (this.userId === null) {
          console.warn('Utente non autenticato');
        }
        window.alert('Prezzo non disponibile o utente non autenticato, impossibile completare la vendita');
      }
    }
  }