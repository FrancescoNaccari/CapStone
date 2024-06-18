import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';



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
import { CustomNewsletterComponent } from './components/newsletter/custom-newsletter/custom-newsletter.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomNewsletterComponent,
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
    InvioNewsletterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPopoverModule,
     FormsModule, 
     ReactiveFormsModule,
  NgxEditorModule.forRoot({
    locals: {
      // menu
      bold: 'Bold',
      italic: 'Italic',
      code: 'Code',
      blockquote: 'Blockquote',
      underline: 'Underline',
      strike: 'Strike',
      bullet_list: 'Bullet List',
      ordered_list: 'Ordered List',
      heading: 'Heading',
      h1: 'Header 1',
      h2: 'Header 2',
      h3: 'Header 3',
      h4: 'Header 4',
      h5: 'Header 5',
      h6: 'Header 6',
      align_left: 'Left Align',
      align_center: 'Center Align',
      align_right: 'Right Align',
      align_justify: 'Justify',
      text_color: 'Text Color',
      background_color: 'Background Color',

      // popups, forms, others...
      url: 'URL',
      text: 'Text',
      openInNewTab: 'Open in new tab',
      insert: 'Insert',
      altText: 'Alt Text',
      title: 'Title',
      remove: 'Remove',
      enterValidUrl: 'Please enter a valid URL',
    },
  }),
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
