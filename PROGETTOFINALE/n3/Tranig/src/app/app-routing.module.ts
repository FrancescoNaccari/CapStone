import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './components/error404/error404.component';
import { GraficChartsComponent } from './components/grafic-charts/grafic-charts.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "grafic-chart", component: GraficChartsComponent },//da moodificare
  {path: "error404", component: Error404Component},
  {path: "**",redirectTo: "error404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
