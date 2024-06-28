import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/interface/stock.interface';
import { TransactionRequest } from 'src/app/interface/transaction-request.interface';
import { Transaction } from 'src/app/interface/transaction.interface';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-lista-azioni-user',
  templateUrl: './lista-azioni-user.component.html',
  styleUrls: ['./lista-azioni-user.component.scss']
})
export class ListaAzioniUserComponent implements OnInit {
  @Input() userId: number | null = null;
  stocks: Stock[] = [];
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    if (this.userId !== null) {
      this.loadUserStocks();
      this.loadUserTransactions();
    }
  }

  loadUserStocks(): void {
    if (this.userId !== null) {
      this.transactionService.getUserStocks(this.userId).subscribe((stocks) => {
        this.stocks = stocks;
      });
    }
  }

  loadUserTransactions(): void {
    if (this.userId !== null) {
      this.transactionService.getUserTransactions(this.userId).subscribe(
        (transactions) => {
          // Converte la stringa di data in stringa ISO se la data è valida           // Assicurarsi che la data sia nel formato corretto
          this.transactions = transactions.map(transaction => ({
            ...transaction,
            date: this.formatDate(transaction.date)
          }));
          console.log('Transazioni ricevute:', this.transactions);
        },
        (error) => {
          console.error('Errore durante il recupero delle transazioni:', error);
        }
      );
    }
  }

  formatDate(dateString: string): string {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? dateString : parsedDate.toISOString();
  }
  
}
