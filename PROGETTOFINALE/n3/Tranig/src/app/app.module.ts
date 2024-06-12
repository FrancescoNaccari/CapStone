import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error404/error404.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WebsocketComponent } from './components/websocket/websocket.component';

import { BorsaComponent } from './components/borsa/borsa.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { LoginComponent } from './components/login/login.component';
import { ProfiloComponent } from './components/profilo/profilo.component';

@NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    Error404Component,
    HomeComponent,
    WebsocketComponent,
    FooterComponent,

    BorsaComponent,
    StockCardComponent,
    LoginComponent,
    ProfiloComponent
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
