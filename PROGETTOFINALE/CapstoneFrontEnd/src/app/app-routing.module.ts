import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockDetailComponent } from './components/stock-detail/stock-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/stocks', pathMatch: 'full' },
  { path: 'stocks', component: StockListComponent },
  { path: 'stocks/:symbol', component: StockDetailComponent },
  // Altre rotte se necessario
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }