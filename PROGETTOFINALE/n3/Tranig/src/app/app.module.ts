import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error404/error404.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WebsocketComponent } from './components/websocket/websocket.component';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { BorsaComponent } from './components/borsa/borsa.component';
import { StockCardComponent } from './components/stock-card/stock-card.component';
import { LoginComponent } from './components/login/login.component';
import { ProfiloComponent } from './components/profilo/profilo.component';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { FavoriteStocksComponent } from './components/favorite-stocks/favorite-stocks.component';
import { ContattaciComponent } from './components/footer/contattaci/contattaci.component';
import { PrivacyPolicyComponent } from './components/footer/privacy-policy/privacy-policy.component';
import { TerminiDiServizioComponent } from './components/footer/termini-di-servizio/termini-di-servizio.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { InvioNewsletterComponent } from './components/newsletter/invio-newsletter/invio-newsletter.component';


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
    ProfiloComponent,
    FavoriteStocksComponent,
    TerminiDiServizioComponent,
    PrivacyPolicyComponent,
    ContattaciComponent,
    NewsletterComponent,
    InvioNewsletterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbPopoverModule 

  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
