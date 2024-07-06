import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { QuoteBorse } from 'src/app/interface/quote-borse.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
import { QuoteBorseService } from 'src/app/service/quote-borse.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, Output, TemplateRef, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.scss']
})
export class StockCardComponent implements OnInit {
  @Input() symbol!: string;
  @Input() stock: any;
  @Input() favorites: any[] = [];
  @Output() favoriteToggled = new EventEmitter<any>();

  alertMessage: string | null = null;
  alertType: string = 'info';
  currentCartIcon: string = '../../../assets/img/ICON_BUY-ACQUISTARE-WH.png';
  defaultCartIcon: string = '../../../assets/img/ICON_BUY-ACQUISTARE-WH.png';
  hoverCartIcon: string = '../../../assets/img/ICON-buy.png';

  constructor(
    private realTimePriceService: RealTimePriceService,
    private logoBorsaService: LogoBorsaService,
    private quoteBorseService: QuoteBorseService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private translate: TranslateService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getRealTimePrice();
    this.getLogo();
    this.favorites.forEach(favorite => {
      if (favorite.symbol === this.stock.symbol) {
        this.stock.favorite = true;
      }
    });
  }
  isUserAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  openModal(content: TemplateRef<any>) {
    if (!this.isUserAuthenticated()) {
      this.showAlert(this.translate.instant('alerts.LOGIN_REQUIRED'), 'danger');
      return;
    }
  
    this.getRealTimePrice();
    const modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: "static", keyboard: false });
    modalRef.componentInstance.symbol = this.stock.symbol;
    modalRef.componentInstance.currentPrice = this.stock.price;
    modalRef.componentInstance.userId = this.stock.userId;
    modalRef.result.then((result) => {
      this.currentCartIcon = this.defaultCartIcon;
    }, () => { this.currentCartIcon = this.defaultCartIcon;
    })
    this.currentCartIcon = this.hoverCartIcon;
  }
  closeModal(modal: any) {
    modal.dismiss();
    this.currentCartIcon = this.defaultCartIcon;  // Ripristina l'icona originale alla chiusura del modal
  }

  getRealTimePrice(): void {
    this.realTimePriceService.getRealTimePrice(this.stock.symbol).subscribe(
      (response: RealTimePriceResponse) => {
        this.stock.price = response.price;
        this.getPreviousClosePrice(response.price);
      },
      (error) => {
        console.error(this.translate.instant('stockTransaction.PRICE_NOT_LOADED'), error);
      }
    );
  }

  getPreviousClosePrice(currentPrice: number): void {
    this.quoteBorseService.getQuote(this.stock.symbol).subscribe(
      (response: QuoteBorse) => {
        const previousClose = Number(response.previous_close);
        this.stock.increased = currentPrice >= previousClose;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error(this.translate.instant('stockTransaction.PRICE_NOT_LOADED'), error);
      }
    );
  }

  getLogo(): void {
    this.logoBorsaService.getLogo(this.stock.symbol).subscribe(
      (response: LogoBorsa) => {
        if (response && response.url) {
          this.stock.logoUrl = response.url;
          this.cdr.detectChanges();
        } else {
          console.error('Logo URL non trovato nella risposta:', response);
        }
      },
      (error) => {
        console.error('Errore durante il recupero del logo', error);
      }
    );
  }

  toggleFavorite(): void {
    if (!this.isUserAuthenticated()) {
      this.showAlert(this.translate.instant('alerts.LOGIN_REQUIRED'), 'danger');
      return;
    }
  
    this.stock.favorite = !this.stock.favorite;
    this.favoriteToggled.emit(this.stock);
    this.showAlert(
      this.translate.instant(this.stock.favorite ? 'alerts.ADDED_TO_FAVORITES' : 'alerts.REMOVED_FROM_FAVORITES', { stockName: this.stock.name }),
      this.stock.favorite ? 'success' : 'warning'
    );
  }
  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.alertMessage = null, 3000); // Nasconde l'alert dopo 3 secondi
  }

  changeCartIcon(): void {
    this.currentCartIcon = this.hoverCartIcon;
  }

  restoreCartIcon(): void {
    if (!this.modalService.hasOpenModals()) { // Se il modal non è aperto, ripristina l'icona originale
      this.currentCartIcon = this.defaultCartIcon;
    }
  }
}