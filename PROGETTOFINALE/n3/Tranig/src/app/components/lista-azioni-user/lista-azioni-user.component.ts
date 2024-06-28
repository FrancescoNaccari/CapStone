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


  filterDate: string = '';
  filterType: string = '';
  filterPrice: number | null = null;
  transactionTypes: string[] = ['ACQUISTO', 'VENDITA', 'DEPOSITO', 'PRELIEVO'];
  filters: { [key: string]: { date: string; price: number | null } } = {
    'ACQUISTO': { date: '', price: null },
    'VENDITA': { date: '', price: null },
    'DEPOSITO': { date: '', price: null },
    'PRELIEVO': { date: '', price: null }
  };


  currentPage: { [key: string]: number } = {
    'ACQUISTO': 1,
    'VENDITA': 1,
    'DEPOSITO': 1,
    'PRELIEVO': 1
  };
  pageSize = 10;
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
          // Converte la stringa di data in stringa ISO se la data è valida
          this.transactions = transactions.map(transaction => ({
            ...transaction,
            date: this.formatDate(transaction.date)
          }));
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
  getFilteredTransactions(type: string): Transaction[] {
    const filter = this.filters[type];
    return this.transactions.filter(transaction => 
      transaction.type === type &&
      (!filter.date || this.doesDateMatch(transaction.date, filter.date)) &&
      (!filter.price || transaction.price === filter.price)
    );
  }

  doesDateMatch(transactionDate: string, filterDate: string): boolean {
    const transactionDateObj = new Date(transactionDate);
    const filterDateObj = new Date(filterDate);
    return transactionDateObj.toDateString() === filterDateObj.toDateString();
  }

  getPages(type: string): number[] {
    const filteredTransactions = this.getFilteredTransactions(type);
    const pageCount = Math.ceil(filteredTransactions.length / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  changePage(type: string, page: number): void {
    const pageCount = this.getPages(type).length;
    if (page > 0 && page <= pageCount) {
      this.currentPage[type] = page;
    }
  }
}
