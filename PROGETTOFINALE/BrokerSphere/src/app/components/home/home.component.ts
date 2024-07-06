import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { FavoriteStock } from 'src/app/interface/favorite-stock.interface';
import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
import { LogoDto } from 'src/app/interface/logo-dto.interface';
import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
import { StockList } from 'src/app/interface/stock-list.interface';
import { AuthService } from 'src/app/service/auth.service';
import { FavoriteStockService } from 'src/app/service/favorite-stock.service';
import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
import { RealTimePriceService } from 'src/app/service/real-time-price.service';
import { StockListService } from 'src/app/service/stock-list.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  stock: any = {};
  symbol: string = '';
  errorMessage: string | null = null;
  user: AuthData | null = null;
  allStocks: StockList[] = [];
  displayedStocks: StockList[] = [];
  favoriteStocks: FavoriteStock[] = [];
  isLoading: boolean = true;

  constructor(
    private realTimePriceService: RealTimePriceService,
    private logoBorsaService: LogoBorsaService,
    private stockListService: StockListService,
    private authSrv: AuthService,
    private favoriteStockService: FavoriteStockService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getStocks();
    this.authSrv.user$.subscribe((data) => {
      if (isAuthData(data)) {
        this.user = data;
        if (this.user.user.idUtente) {
          this.loadFavorites(this.user.user.idUtente.toString());
        }
      }
    });
    this.updateBackgroundImage();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateDisplayedStocks();
    this.updateBackgroundImage();
  }

  ngOnDestroy(): void {
    this.restoreDefaultBackgroundImage();
  }

  updateBackgroundImage(): void {
    const width = window.innerWidth;
    const desktopBackground = '../../../assets/img/1920X1080_HOME-BACKGROUND.png';
    const mobileBackground = '../../../assets/img/SMART_HOME-BACKGROUND.png';
    const backgroundImage = width < 768 ? mobileBackground : desktopBackground;
    document.body.style.backgroundImage = `url('${backgroundImage}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'scroll'; // Imposta lo sfondo per scorrere insieme alla pagina
    document.body.style.minHeight = '100vh'; // Assicurati che il body copra almeno tutta la vista
  }

  restoreDefaultBackgroundImage(): void {
    // Imposta lo sfondo predefinito qui
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = '';
    document.body.style.backgroundPosition = '';
    document.body.style.backgroundRepeat = '';
    document.body.style.backgroundAttachment = '';
    document.body.style.minHeight = '';
  }

  getStocks(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.logoBorsaService.getAllLogos().subscribe(
        (response: LogoDto[]) => {
          let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
          let filter2: LogoDto[] = [];
          filteredStocks.forEach(logo => {
            let image = new Image();
            image.src = logo.url;
            image.onload = () => {
              filter2.push(logo);
            };
          });

          setTimeout(() => {
            this.stockListService.getStockList().subscribe((response: StockList[]) => {
              this.allStocks = response.filter(stock => {
                return filter2.map(logo => logo.symbol).includes(stock.symbol);
              });
              this.updateDisplayedStocks();
              this.isLoading = false;
            });
          }, 100);
        },
        (error) => {
          this.errorMessage = this.translate.instant('home.ERROR_MESSAGE');
          this.allStocks = [];
          this.updateDisplayedStocks();
          this.isLoading = false;
        }
      );
    }, 3000); // Delay for at least 3 seconds
  }

  // updateDisplayedStocks(): void {
  //   const width = window.innerWidth;

  //   let numberOfCards;
  //   if (width < 768) {
  //     numberOfCards = 5;
  //   } else if (width >= 768 && width < 992) {
  //     numberOfCards = 7;
  //   } else if (width >= 992 && width < 1200) {
  //     numberOfCards = 8;
  //   } else if (width >= 1200 && width < 1640) {
  //     numberOfCards = 9;
  //   } else {
  //     numberOfCards = 10;
  //   }

  //   const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
  //   this.displayedStocks = shuffled.slice(0, numberOfCards);
  // }

  updateDisplayedStocks(): void {
    const width = window.innerWidth;

    let numberOfCards;
    if (width < 1200) {
      numberOfCards = 8;
    }else if (width >= 1200 && width < 1920) {
      numberOfCards = 9;
    } else {
      numberOfCards = 10;
    }

    const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
    this.displayedStocks = shuffled.slice(0, numberOfCards);
  }
  loadFavorites(userId: string): void {
    this.favoriteStockService.getFavorites(parseInt(userId)).subscribe(
      (favorites: FavoriteStock[]) => {
        this.favoriteStocks = favorites;
      },
      (error) => {
        this.errorMessage = this.translate.instant('favoriteStocks.LOAD_ERROR');
      }
    );
  }

  onFavoriteToggled(stock: FavoriteStock): void {
    if (this.user) {
      const userId = this.user.user.idUtente;
      if (userId) {
        if (stock.favorite) {
          const favorite: FavoriteStock = { ...stock, userId };
          this.favoriteStockService.addFavorite(favorite).subscribe(
            (addedStock) => {
              this.favoriteStocks.push(addedStock);
            },
            (error) => {
              this.errorMessage = this.translate.instant('favoriteStocks.REMOVE_ERROR');
            }
          );
        } else {
          const favoriteToRemove = this.favoriteStocks.find(fav => fav.symbol === stock.symbol);
          if (favoriteToRemove) {
            this.favoriteStockService.removeFavorite(favoriteToRemove.id!).subscribe(
              () => {
                this.favoriteStocks = this.favoriteStocks.filter(s => s.symbol !== stock.symbol);
              },
              (error) => {
                this.errorMessage = this.translate.instant('favoriteStocks.REMOVE_ERROR');
              }
            );
          }
        }
      }
    }
  }
}

function isAuthData(user: any): user is AuthData {
  return user && 'accessToken' in user && 'user' in user;
}
