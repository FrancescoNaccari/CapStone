import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error404/error404.component';
import { FooterComponent } from './components/footer/footer.component';
import { GraficChartsComponent } from './components/grafic-charts/grafic-charts.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WebsocketComponent } from './components/websocket/websocket.component';
import { GraficoFinanziarioComponent } from './components/grafico-finanziario/grafico-finanziario.component';
import { FinanziarioComponent } from './components/finanziario/finanziario.component';
import { BorsaComponent } from './components/borsa/borsa.component';

@NgModule({
  declarations: [
    AppComponent,
     GraficChartsComponent,
    NavbarComponent,
    Error404Component,
    HomeComponent,
    WebsocketComponent,
    FooterComponent,
    GraficoFinanziarioComponent,
    FinanziarioComponent,
    BorsaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
