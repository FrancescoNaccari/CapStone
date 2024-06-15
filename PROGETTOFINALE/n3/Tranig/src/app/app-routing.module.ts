import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';

import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { LeadingComment } from '@angular/compiler';
import { LoginComponent } from './components/login/login.component';
import { BorsaComponent } from './components/borsa/borsa.component';
import { FavoriteStocksComponent } from './components/favorite-stocks/favorite-stocks.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  // { path: "borse", component: BorsaComponent, canActivate: [AuthGuard]},
  { path: 'favorites', component: FavoriteStocksComponent },
  { path: "profilo", component: ProfiloComponent, canActivate: [AuthGuard] },
  { path: "error404", component: Error404Component },
  { path: "**", redirectTo: "error404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
