import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Stock } from 'src/app/interface/stock.interface';
import { TransactionRequest } from 'src/app/interface/transaction-request.interface';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-stock-transaction',
  templateUrl: './stock-transaction.component.html',
  styleUrls: ['./stock-transaction.component.scss']
})
export class StockTransactionComponent implements OnInit, OnChanges {
  alertMessage: string | null = null;
  alertType: 'success' | 'danger' | null = null;

  @Input() symbol: string = ''
  @Input() currentPrice: number = 0;
  @Input() userId: number | null = null;
  @Output() transactionUpdated = new EventEmitter<void>();
  quantity: number = 1;
  balance: number = 0;
  ownedQuantity: number = 0;

  user: User | null = null;
  private subscription: Subscription = new Subscription();
  isPriceLoaded: boolean = false;

  constructor(
    private authService: AuthService,
    private profiloService: ProfiloService,
    private realTimePriceService: RealTimePriceService,
    private transactionService: TransactionService,
    private activeModal: NgbActiveModal,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.user$.subscribe((data) => {
        this.user = data?.user || null;
        this.balance = this.user?.balance || 0;
        this.updateOwnedQuantity();
      })
    );
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
      this.quantity = 1;
    }
  }
  showAlert(message: string, type: 'success' | 'danger'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
        this.onAlertClose();
    }, 3000);
}


onAlertClose(): void {
  this.alertMessage = null;
  this.alertType = null;
}
closeModal(): void {
  this.activeModal.close();
}
  getRealTimePrice(): void {
    this.isPriceLoaded = false;
    this.subscription.add(
      this.realTimePriceService.getRealTimePrice(this.symbol).subscribe({
        next: (response) => {
          this.currentPrice = response.price;
          this.isPriceLoaded = true;
        },
        error: (error) => console.error(this.translate.instant('stockTransaction.PRICE_NOT_LOADED'), error)
      })
    );
  }

  updateOwnedQuantity(): void {
    if (this.user) {
      const ownedStock = this.user.stocks?.find(stock => stock.symbol === this.symbol);
      this.ownedQuantity = ownedStock ? ownedStock.quantity : 0;
    }
  }

  buyStock(): void {
    if (this.quantity <= 0) {
      this.showAlert(this.translate.instant('stockTransaction.INVALID_QUANTITY'), 'danger');
      return;
    }

    if (!this.isPriceLoaded || this.currentPrice === 0) {
      this.showAlert(this.translate.instant('stockTransaction.PRICE_NOT_LOADED'), 'danger');
      return;
    }

    const totalCost = this.currentPrice * this.quantity;
    if (this.user && totalCost <= this.balance) {
      const request: TransactionRequest = {
        userId: this.user.idUtente!,
        symbol: this.symbol,
        quantity: this.quantity,
        price: this.currentPrice
      };
      this.subscription.add(
        this.transactionService.buyStock(request).subscribe({
          next: (updatedUser) => {
            this.authService.updateUser(updatedUser);
            this.updateUserData(updatedUser);
            this.authService.loadUserBalance(updatedUser.idUtente!);

            this.updateOwnedQuantity();
            this.transactionUpdated.emit();
            this.showAlert(this.translate.instant('stockTransaction.SUCCESS_BUY'), 'success');
          },
          error: (error) => console.error('Errore durante l\'acquisto delle azioni:', error)
        })
      );
    } else {
      this.showAlert(this.translate.instant('stockTransaction.INSUFFICIENT_BALANCE'), 'danger');
    }
  }

  sellStock(): void {
    if (this.quantity <= 0) {
      this.showAlert(this.translate.instant('stockTransaction.INVALID_QUANTITY'), 'danger');
      return;
    }

    if (!this.isPriceLoaded || this.currentPrice === 0) {
      this.showAlert(this.translate.instant('stockTransaction.PRICE_NOT_LOADED'), 'danger');
      return;
    }

    if (this.user && this.quantity <= this.ownedQuantity) {
      const request: TransactionRequest = {
        userId: this.user.idUtente!,
        symbol: this.symbol,
        quantity: this.quantity,
        price: this.currentPrice
      };
      this.subscription.add(
        this.transactionService.sellStock(request).subscribe({
          next: (updatedUser) => {
            this.authService.updateUser(updatedUser);
            this.updateUserData(updatedUser);
            this.authService.loadUserBalance(updatedUser.idUtente!);

            this.updateOwnedQuantity();
            this.transactionUpdated.emit();
            this.showAlert(this.translate.instant('stockTransaction.SUCCESS_SELL'), 'success');
          },
          error: (error) => console.error('Errore durante la vendita delle azioni:', error)
        })
      );
    } else {
      this.showAlert(this.translate.instant('stockTransaction.INSUFFICIENT_QUANTITY'), 'danger');
    }
  }

  updateUserData(updatedUser: User): void {
    this.user = updatedUser;
    this.balance = updatedUser.balance || 0;
    this.authService.updateUser(updatedUser);
  }

  onSubmit(): void {
    this.getRealTimePrice();
  }
}
