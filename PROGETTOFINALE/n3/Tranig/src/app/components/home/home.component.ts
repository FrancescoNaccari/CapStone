// import { Component, HostListener, OnInit } from '@angular/core';
// import { AuthData } from 'src/app/interface/auth-data.interface';
// import { FavoriteStock } from 'src/app/interface/favorite-stock.interface';
// import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
// import { LogoDto } from 'src/app/interface/logo-dto.interface';
// import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
// import { StockList } from 'src/app/interface/stock-list.interface';
// import { AuthService } from 'src/app/service/auth.service';
// import { FavoriteStockService } from 'src/app/service/favorite-stock.service';

// import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
// import { RealTimePriceService } from 'src/app/service/real-time-price.service';
// import { StockListService } from 'src/app/service/stock-list.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {

// // stock: any = {};
// // symbol: string = '';
// // errorMessage: string | null = null;
// // user: AuthData | null = null;
// // allStocks: StockList[] = [];
// // displayedStocks: StockList[] = [];
// // favoriteStocks: FavoriteStock[] = [];

// // constructor(
// //   private realTimePriceService: RealTimePriceService,
// //   private logoBorsaService: LogoBorsaService,
// //   private stockListService: StockListService,
// //   private authSrv: AuthService,
// //   private favoriteStockService: FavoriteStockService
// // ) {}

// // ngOnInit(): void {
// //   this.getStocks();
// //   this.authSrv.user$.subscribe((data) => {
// //     this.user = data;
// //     if (this.user && this.user.user.idUtente) {
// //       this.loadFavorites(this.user.user.idUtente.toString());
// //     }
// //   });
// // }

// // @HostListener('window:resize', ['$event'])
// // onResize(event: any) {
// //   this.updateDisplayedStocks();
// // }

// // getStocks(): void {
// //   this.logoBorsaService.getAllLogos().subscribe(
// //     (response: LogoDto[]) => {
// //       let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
// //       let filter2: LogoDto[] = [];
// //       filteredStocks.forEach(logo => {
// //         let image = new Image();
// //         image.src = logo.url;
// //         image.onload = () => {
// //           filter2.push(logo);
// //         };
// //       });

// //       setTimeout(() => {
// //         this.stockListService.getStockList().subscribe((response: StockList[]) => {
// //           this.allStocks = response.filter(stock => {
// //             return filter2.map(logo => logo.symbol).includes(stock.symbol);
// //           });
// //           this.updateDisplayedStocks();
// //         });
// //       }, 2000);
// //     },
// //     (error) => {
// //       console.error('Errore durante il recupero della lista delle azioni', error);
// //       this.allStocks = [];
// //       this.updateDisplayedStocks();
// //     }
// //   );
// // }

// // updateDisplayedStocks(): void {
// //   const width = window.innerWidth;

// //   let numberOfCards;
// //   if (width < 768) { // sm
// //     numberOfCards = 5;
// //   } else if (width >= 768 && width < 992) { // md
// //     numberOfCards = 7;
// //   } else if (width >= 992 && width < 1200) { // lg
// //     numberOfCards = 8;
// //   } else { // xl
// //     numberOfCards = 10;
// //   }

// //    const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
// //   this.displayedStocks = shuffled.slice(0, numberOfCards);
// //   // this.displayedStocks = this.allStocks.slice(0, numberOfCards);
// // }

// // loadFavorites(userId: string): void {
// //   this.favoriteStockService.getFavorites(parseInt(userId)).subscribe(
// //     (favorites: FavoriteStock[]) => {
// //       this.favoriteStocks = favorites;
// //     },
// //     (error) => {
// //       console.error('Errore durante il recupero dei preferiti', error);
// //     }
// //   );
// // }
// // onFavoriteToggled(stock: FavoriteStock): void {
// //   if (this.user) {
// //     const userId = this.user.user.idUtente
// //     if (userId) {
// //       if (stock.favorite) {
// //         const favorite: FavoriteStock = { ...stock, userId };
// //         this.favoriteStockService.addFavorite(favorite).subscribe(
// //           (addedStock) => {
// //             this.favoriteStocks.push(addedStock);
// //           },
// //           (error) => {
// //             console.error('Errore durante il salvataggio del preferito', error);
// //           }
// //         );
// //       } else {
// //         const favoriteToRemove = this.favoriteStocks.find(fav => fav.symbol === stock.symbol);
// //         if (favoriteToRemove) {
// //           this.favoriteStockService.removeFavorite(favoriteToRemove.id!).subscribe(
// //             () => {
// //               this.favoriteStocks = this.favoriteStocks.filter(s => s.symbol !== stock.symbol);
// //             },
// //             (error) => {
// //               console.error('Errore durante la rimozione del preferito', error);
// //             }
// //           );
// //         }
// //       }
// //     }
// //   }
// // }

// // }



// stock: any = {};
// symbol: string = '';
// errorMessage: string | null = null;
// user: AuthData | null = null;
// allStocks: StockList[] = [];
// displayedStocks: StockList[] = [];
// favoriteStocks: FavoriteStock[] = [];

// constructor(
//   private realTimePriceService: RealTimePriceService,
//   private logoBorsaService: LogoBorsaService,
//   private stockListService: StockListService,
//   private authSrv: AuthService,
//   private favoriteStockService: FavoriteStockService
// ) {}

// ngOnInit(): void {
//   this.getStocks();
//   this.authSrv.user$.subscribe((data) => {
//     if (isAuthData(data)) {
//       this.user = data;
//       if (this.user.user.idUtente) {
//         this.loadFavorites(this.user.user.idUtente.toString());
//       }
//     }
//   });
// }

// @HostListener('window:resize', ['$event'])
// onResize(event: any) {
//   this.updateDisplayedStocks();
// }

// getStocks(): void {
//   this.logoBorsaService.getAllLogos().subscribe(
//     (response: LogoDto[]) => {
//       let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
//       let filter2: LogoDto[] = [];
//       filteredStocks.forEach(logo => {
//         let image = new Image();
//         image.src = logo.url;
//         image.onload = () => {
//           filter2.push(logo);
//         };
//       });

//       setTimeout(() => {
//         this.stockListService.getStockList().subscribe((response: StockList[]) => {
//           this.allStocks = response.filter(stock => {
//             return filter2.map(logo => logo.symbol).includes(stock.symbol);
//           });
//           this.updateDisplayedStocks();
//         });
//       }, 2000);
//     },
//     (error) => {
//       console.error('Errore durante il recupero della lista delle azioni', error);
//       this.allStocks = [];
//       this.updateDisplayedStocks();
//     }
//   );
// }

// updateDisplayedStocks(): void {
//   const width = window.innerWidth;

//   let numberOfCards;
//   if (width < 768) { // sm
//     numberOfCards = 5;
//   } else if (width >= 768 && width < 992) { // md
//     numberOfCards = 7;
//   } else if (width >= 992 && width < 1200) { // lg
//     numberOfCards = 8;
//   } else { // xl
//     numberOfCards = 10;
//   }

//   const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
//   this.displayedStocks = shuffled.slice(0, numberOfCards);
// }

// loadFavorites(userId: string): void {
//   this.favoriteStockService.getFavorites(parseInt(userId)).subscribe(
//     (favorites: FavoriteStock[]) => {
//       this.favoriteStocks = favorites;
//     },
//     (error) => {
//       console.error('Errore durante il recupero dei preferiti', error);
//     }
//   );
// }

// onFavoriteToggled(stock: FavoriteStock): void {
//   if (this.user) {
//     const userId = this.user.user.idUtente;
//     if (userId) {
//       if (stock.favorite) {
//         const favorite: FavoriteStock = { ...stock, userId };
//         this.favoriteStockService.addFavorite(favorite).subscribe(
//           (addedStock) => {
//             this.favoriteStocks.push(addedStock);
//           },
//           (error) => {
//             console.error('Errore durante il salvataggio del preferito', error);
//           }
//         );
//       } else {
//         const favoriteToRemove = this.favoriteStocks.find(fav => fav.symbol === stock.symbol);
//         if (favoriteToRemove) {
//           this.favoriteStockService.removeFavorite(favoriteToRemove.id!).subscribe(
//             () => {
//               this.favoriteStocks = this.favoriteStocks.filter(s => s.symbol !== stock.symbol);
//             },
//             (error) => {
//               console.error('Errore durante la rimozione del preferito', error);
//             }
//           );
//         }
//       }
//     }
//   }
// }
// }

// // Funzione type guard
// function isAuthData(user: any): user is AuthData {
// return user && 'accessToken' in user && 'user' in user;
// }

// import { Component, HostListener, OnInit } from '@angular/core';
// import { AuthData } from 'src/app/interface/auth-data.interface';
// import { FavoriteStock } from 'src/app/interface/favorite-stock.interface';
// import { LogoBorsa } from 'src/app/interface/logo-borsa.interface';
// import { LogoDto } from 'src/app/interface/logo-dto.interface';
// import { RealTimePriceResponse } from 'src/app/interface/real-time-price-response.interface';
// import { StockList } from 'src/app/interface/stock-list.interface';
// import { AuthService } from 'src/app/service/auth.service';
// import { FavoriteStockService } from 'src/app/service/favorite-stock.service';
// import { LogoBorsaService } from 'src/app/service/logo-borsa.service';
// import { RealTimePriceService } from 'src/app/service/real-time-price.service';
// import { StockListService } from 'src/app/service/stock-list.service';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss']
// })
// export class HomeComponent implements OnInit {
//   stock: any = {};
//   symbol: string = '';
//   errorMessage: string | null = null;
//   user: AuthData | null = null;
//   allStocks: StockList[] = [];
//   displayedStocks: StockList[] = [];
//   favoriteStocks: FavoriteStock[] = [];

//   constructor(
//     private realTimePriceService: RealTimePriceService,
//     private logoBorsaService: LogoBorsaService,
//     private stockListService: StockListService,
//     private authSrv: AuthService,
//     private favoriteStockService: FavoriteStockService,
//     private translate: TranslateService
//   ) {}

//   ngOnInit(): void {
//     this.getStocks();
//     this.authSrv.user$.subscribe((data) => {
//       if (isAuthData(data)) {
//         this.user = data;
//         if (this.user.user.idUtente) {
//           this.loadFavorites(this.user.user.idUtente.toString());
//         }
//       }
//     });
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.updateDisplayedStocks();
//   }

//   getStocks(): void {
//     this.logoBorsaService.getAllLogos().subscribe(
//       (response: LogoDto[]) => {
//         let filteredStocks = response.filter(logo => logo.url !== null && logo.url !== '');
//         let filter2: LogoDto[] = [];
//         filteredStocks.forEach(logo => {
//           let image = new Image();
//           image.src = logo.url;
//           image.onload = () => {
//             filter2.push(logo);
//           };
//         });

//         setTimeout(() => {
//           this.stockListService.getStockList().subscribe((response: StockList[]) => {
//             this.allStocks = response.filter(stock => {
//               return filter2.map(logo => logo.symbol).includes(stock.symbol);
//             });
//             this.updateDisplayedStocks();
//           });
//         }, 2000);
//       },
//       (error) => {
//         this.errorMessage = this.translate.instant('home.ERROR_MESSAGE');
//         this.allStocks = [];
//         this.updateDisplayedStocks();
//       }
//     );
//   }

//   updateDisplayedStocks(): void {
//     const width = window.innerWidth;

//     let numberOfCards;
//     if (width < 768) {
//       numberOfCards = 5;
//     } else if (width >= 768 && width < 992) {
//       numberOfCards = 7;
//     } else if (width >= 992 && width < 1200) {
//       numberOfCards = 8;
//     } else {
//       numberOfCards = 10;
//     }

//     const shuffled = this.allStocks.sort(() => 0.5 - Math.random());
//     this.displayedStocks = shuffled.slice(0, numberOfCards);
//   }

//   loadFavorites(userId: string): void {
//     this.favoriteStockService.getFavorites(parseInt(userId)).subscribe(
//       (favorites: FavoriteStock[]) => {
//         this.favoriteStocks = favorites;
//       },
//       (error) => {
//         this.errorMessage = this.translate.instant('favoriteStocks.LOAD_ERROR');
//       }
//     );
//   }

//   onFavoriteToggled(stock: FavoriteStock): void {
//     if (this.user) {
//       const userId = this.user.user.idUtente;
//       if (userId) {
//         if (stock.favorite) {
//           const favorite: FavoriteStock = { ...stock, userId };
//           this.favoriteStockService.addFavorite(favorite).subscribe(
//             (addedStock) => {
//               this.favoriteStocks.push(addedStock);
//             },
//             (error) => {
//               this.errorMessage = this.translate.instant('favoriteStocks.REMOVE_ERROR');
//             }
//           );
//         } else {
//           const favoriteToRemove = this.favoriteStocks.find(fav => fav.symbol === stock.symbol);
//           if (favoriteToRemove) {
//             this.favoriteStockService.removeFavorite(favoriteToRemove.id!).subscribe(
//               () => {
//                 this.favoriteStocks = this.favoriteStocks.filter(s => s.symbol !== stock.symbol);
//               },
//               (error) => {
//                 this.errorMessage = this.translate.instant('favoriteStocks.REMOVE_ERROR');
//               }
//             );
//           }
//         }
//       }
//     }
//   }
// }

// function isAuthData(user: any): user is AuthData {
//   return user && 'accessToken' in user && 'user' in user;
// }
import { Component, HostListener, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit {
  stock: any = {};
  symbol: string = '';
  errorMessage: string | null = null;
  user: AuthData | null = null;
  allStocks: StockList[] = [];
  displayedStocks: StockList[] = [];
  favoriteStocks: FavoriteStock[] = [];
  isLoading: boolean = true; // Aggiungi questa variabile

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
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateDisplayedStocks();
  }

  getStocks(): void {
    this.isLoading = true; // Mostra lo spinner
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
            this.isLoading = false; // Nascondi lo spinner
          });
        }, 100);
      },
      (error) => {
        this.errorMessage = this.translate.instant('home.ERROR_MESSAGE');
        this.allStocks = [];
        this.updateDisplayedStocks();
        this.isLoading = false; // Nascondi lo spinner
      }
    );
  }

  updateDisplayedStocks(): void {
    const width = window.innerWidth;

    let numberOfCards;
    if (width < 768) {
      numberOfCards = 5;
    } else if (width >= 768 && width < 992) {
      numberOfCards = 7;
    } else if (width >= 992 && width < 1200) {
      numberOfCards = 8;
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
