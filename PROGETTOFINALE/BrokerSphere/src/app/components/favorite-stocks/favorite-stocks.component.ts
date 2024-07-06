import { Component, OnInit } from '@angular/core';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { FavoriteStock } from 'src/app/interface/favorite-stock.interface';
import { AuthService } from 'src/app/service/auth.service';
import { FavoriteStockService } from 'src/app/service/favorite-stock.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-favorite-stocks',
  templateUrl: './favorite-stocks.component.html',
  styleUrls: ['./favorite-stocks.component.scss']
})
export class FavoriteStocksComponent implements OnInit {
  favoriteStocks: FavoriteStock[] = [];
  user: AuthData | null = null;
  errorMessage: string | null = null;
  alertMessage: string | null = null;
  alertType: string = 'info';
  isLoading: boolean = true; // Aggiungi questa variabile

  constructor(
    private favoriteStockService: FavoriteStockService,
    private authSrv: AuthService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      if (isAuthData(data)) {
        this.user = data;
        if (this.user.user.idUtente) {
          this.loadFavorites(this.user.user.idUtente.toString());
        }
      }
    });
  }

  loadFavorites(userId: string): void {
    this.favoriteStockService.getFavorites(parseInt(userId)).subscribe(
      (favorites: FavoriteStock[]) => {
        this.favoriteStocks = favorites;
        this.showSpinnerForOneSecond();
      },
      (error) => {
        this.errorMessage = this.translate.instant('favoriteStocks.LOAD_ERROR');
        this.isLoading = false; // Nascondi lo spinner in caso di errore
      }
    );
  }

  removeFavorite(stock: FavoriteStock): void {
    if (stock.id) {
      this.favoriteStockService.removeFavorite(stock.id).subscribe(
        () => {
          this.favoriteStocks = this.favoriteStocks.filter(s => s.id !== stock.id);
          this.showAlert(
            this.translate.instant('alerts.REMOVED_FROM_FAVORITES', { stockName: stock.name }),
            'warning'
          );
        },
        (error) => {
          this.errorMessage = this.translate.instant('favoriteStocks.REMOVE_ERROR');
        }
      );
    }
  }

  showSpinnerForOneSecond(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => this.alertMessage = null, 3000); // Nasconde l'alert dopo 3 secondi
  }
}

function isAuthData(user: any): user is AuthData {
  return user && 'accessToken' in user && 'user' in user;
}
