import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Stock } from 'src/app/interface/stock.interface';
import { Transaction } from 'src/app/interface/transaction.interface';
import { TransactionService } from 'src/app/service/transaction.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lista-azioni-user',
  templateUrl: './lista-azioni-user.component.html',
  styleUrls: ['./lista-azioni-user.component.scss']
})
export class ListaAzioniUserComponent implements OnInit {
  userId: number | null = null;
  stocks: Stock[] = [];
  transactions: Transaction[] = [];

  transactionTypes: string[] = ['ACQUISTO', 'VENDITA', 'DEPOSITO', 'PRELIEVO'];

  filters: { [key: string]: { fromDate: NgbDate | null; toDate: NgbDate | null; minPrice: number | null; maxPrice: number | null } } = {
    'ACQUISTO': { fromDate: null, toDate: null, minPrice: null, maxPrice: null },
    'VENDITA': { fromDate: null, toDate: null, minPrice: null, maxPrice: null },
    'DEPOSITO': { fromDate: null, toDate: null, minPrice: null, maxPrice: null },
    'PRELIEVO': { fromDate: null, toDate: null, minPrice: null, maxPrice: null }
  };

  hoveredDate: { [key: string]: NgbDate | null } = {
    'ACQUISTO': null,
    'VENDITA': null,
    'DEPOSITO': null,
    'PRELIEVO': null
  };

  currentPage: { [key: string]: number } = {
    'ACQUISTO': 1,
    'VENDITA': 1,
    'DEPOSITO': 1,
    'PRELIEVO': 1
  };

  pageSize = 10;
  isMobileView = window.innerWidth < 400;

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private calendar: NgbCalendar,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = +params['userId'];
      if (this.userId) {
        this.loadUserStocks();
        this.loadUserTransactions();
      } else {
        console.error('User ID is null');
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isMobileView = event.target.innerWidth < 400;
  }

  loadUserStocks(): void {
    if (this.userId !== null) {
      this.transactionService.getUserStocks(this.userId).subscribe(
        (stocks) => {
          this.stocks = stocks;
          console.log('Loaded stocks:', this.stocks);
        },
        (error) => {
          console.error('Error loading user stocks:', error);
        }
      );
    }
  }

  loadUserTransactions(): void {
    if (this.userId !== null) {
      this.transactionService.getUserTransactions(this.userId).subscribe(
        (transactions) => {
          this.transactions = transactions
            .map(transaction => ({
              ...transaction,
              date: this.formatDate(transaction.date)
            }))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          console.log('Loaded transactions:', this.transactions);
        },
        (error) => {
          console.error('Error loading user transactions:', error);
        }
      );
    }
  }

  formatDate(dateString: string): string {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? dateString : parsedDate.toISOString();
  }

  onDateRangeSelected(range: { fromDate: string, toDate: string }, type: string): void {
    const fromDate = new Date(range.fromDate);
    const toDate = new Date(range.toDate);
    this.filters[type].fromDate = new NgbDate(fromDate.getFullYear(), fromDate.getMonth() + 1, fromDate.getDate());
    this.filters[type].toDate = new NgbDate(toDate.getFullYear(), toDate.getMonth() + 1, toDate.getDate());
  }

  getFilteredTransactions(type: string): Transaction[] {
    const filter = this.filters[type];
    return this.transactions.filter(transaction =>
      transaction.type === type &&
      this.doesDateMatch(transaction.date, filter.fromDate, filter.toDate) &&
      this.doesPriceMatch(transaction.price, filter.minPrice, filter.maxPrice)
    );
  }

  doesDateMatch(transactionDate: string, fromDate: NgbDate | null, toDate: NgbDate | null): boolean {
    const date = new Date(transactionDate);
    const start = fromDate ? new Date(fromDate.year, fromDate.month - 1, fromDate.day) : null;
    const end = toDate ? new Date(toDate.year, toDate.month - 1, toDate.day) : null;

    if (start && end) {
      return date >= start && date <= end;
    } else if (start) {
      const nextDay = new Date(start);
      nextDay.setDate(nextDay.getDate() + 1);
      return date >= start && date < nextDay;
    } else if (end) {
      return date <= end;
    }
    return true;
  }

  doesPriceMatch(price: number, minPrice: number | null, maxPrice: number | null): boolean {
    if (minPrice !== null && price < minPrice) {
      return false;
    }
    if (maxPrice !== null && price > maxPrice) {
      return false;
    }
    return true;
  }

  getPages(type: string): number[] {
    const filteredTransactions = this.getFilteredTransactions(type);
    const pageCount = Math.ceil(filteredTransactions.length / this.pageSize);
    const currentPage = this.currentPage[type];

    const maxPages = this.isMobileView ? 3 : 5;

    if (pageCount <= maxPages) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const half = Math.floor(maxPages / 2);

    if (currentPage <= half) {
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    } else if (currentPage >= pageCount - half) {
      return Array.from({ length: maxPages }, (_, i) => pageCount - maxPages + i + 1);
    } else {
      return Array.from({ length: maxPages }, (_, i) => currentPage - half + i);
    }
  }

  changePage(event: Event, type: string, page: number): void {
    event.preventDefault();
    const pageCount = Math.ceil(this.getFilteredTransactions(type).length / this.pageSize);
    if (page > 0 && page <= pageCount) {
      this.currentPage[type] = page;
    }
  }
}
