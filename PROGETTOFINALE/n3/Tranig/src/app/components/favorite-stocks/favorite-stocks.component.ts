// import { Component, OnInit } from '@angular/core';
// import { AuthData } from 'src/app/interface/auth-data.interface';
// import { FavoriteStock } from 'src/app/interface/favorite-stock.interface';
// import { AuthService } from 'src/app/service/auth.service';
// import { FavoriteStockService } from 'src/app/service/favorite-stock.service';

// @Component({
//   selector: 'app-favorite-stocks',
//   templateUrl: './favorite-stocks.component.html',
//   styleUrls: ['./favorite-stocks.component.scss']
// })
// export class FavoriteStocksComponent implements OnInit {
// //   favoriteStocks: FavoriteStock[] = [];
// //   user: AuthData | null = null;
// //   errorMessage: string | null = null;

// //   constructor(
// //     private favoriteStockService: FavoriteStockService,
// //     private authSrv: AuthService
// //   ) {}

// //   ngOnInit(): void {
// //     this.authSrv.user$.subscribe((data) => {
// //       console.log(data);
// //       this.user = data;
// //       if (this.user && this.user.user.idUtente) {
// //         this.loadFavorites(this.user.user.idUtente.toString());

// //       }
// //     });


// //   }

// //   loadFavorites(userId: string): void {
// //     this.favoriteStockService.getFavorites(parseInt(userId)).subscribe(
// //       (favorites: FavoriteStock[]) => {
// //         this.favoriteStocks = favorites;
// //       },
// //       (error) => {
// //         console.error('Errore durante il recupero dei preferiti', error);
// //         this.errorMessage = 'Errore durante il recupero dei preferiti';
// //       }
// //     );
// //   }

// //   removeFavorite(stock: FavoriteStock): void {
// //     if (stock.id) {
// //       this.favoriteStockService.removeFavorite(stock.id).subscribe(
// //         () => {
// //           this.favoriteStocks = this.favoriteStocks.filter(s => s.id !== stock.id);
// //         },
// //         (error) => {
// //           console.error('Errore durante la rimozione del preferito', error);
// //           this.errorMessage = 'Errore durante la rimozione del preferito';
// //         }
// //       );
// //     }
// //   }
// // }



// favoriteStocks: FavoriteStock[] = [];
// user: AuthData | null = null;
// errorMessage: string | null = null;

// constructor(
//   private favoriteStockService: FavoriteStockService,
//   private authSrv: AuthService
// ) {}

// ngOnInit(): void {
//   this.authSrv.user$.subscribe((data) => {
//     console.log(data);
//     if (isAuthData(data)) {
//       this.user = data;
//       if (this.user.user.idUtente) {
//         this.loadFavorites(this.user.user.idUtente.toString());
//       }
//     }
//   });
// }

// loadFavorites(userId: string): void {
//   this.favoriteStockService.getFavorites(parseInt(userId)).subscribe(
//     (favorites: FavoriteStock[]) => {
//       this.favoriteStocks = favorites;
//     },
//     (error) => {
//       console.error('Errore durante il recupero dei preferiti', error);
//       this.errorMessage = 'Errore durante il recupero dei preferiti';
//     }
//   );
// }

// removeFavorite(stock: FavoriteStock): void {
//   if (stock.id) {
//     this.favoriteStockService.removeFavorite(stock.id).subscribe(
//       () => {
//         this.favoriteStocks = this.favoriteStocks.filter(s => s.id !== stock.id);
//       },
//       (error) => {
//         console.error('Errore durante la rimozione del preferito', error);
//         this.errorMessage = 'Errore durante la rimozione del preferito';
//       }
//     );
//   }
// }
// }

// // Type guard function
// function isAuthData(user: any): user is AuthData {
// return user && 'accessToken' in user && 'user' in user;
// }

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
      },
      (error) => {
        this.errorMessage = this.translate.instant('favoriteStocks.LOAD_ERROR');
      }
    );
  }

  removeFavorite(stock: FavoriteStock): void {
    if (stock.id) {
      this.favoriteStockService.removeFavorite(stock.id).subscribe(
        () => {
          this.favoriteStocks = this.favoriteStocks.filter(s => s.id !== stock.id);
        },
        (error) => {
          this.errorMessage = this.translate.instant('favoriteStocks.REMOVE_ERROR');
        }
      );
    }
  }
}

function isAuthData(user: any): user is AuthData {
  return user && 'accessToken' in user && 'user' in user;
}
