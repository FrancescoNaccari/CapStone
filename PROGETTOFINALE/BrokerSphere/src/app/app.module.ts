import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEditorModule } from 'ngx-editor';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {  NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Error404Component } from './components/error404/error404.component';
import { FooterComponent } from './components/footer/footer.component';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WebsocketComponent } from './components/websocket/websocket.component';
import { NgbPopoverModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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

import { CustomNewsletterComponent } from './components/newsletter/custom-newsletter/custom-newsletter.component';
import { GoogleLoginComponent } from './components/login/google-login/google-login.component';
import { CalendarioComponent } from './components/borsa/calendario/calendario.component';
import { CancelComponent } from './components/stripe/cancel/cancel.component';
import { CheckoutComponent } from './components/stripe/checkout/checkout.component';
import { SuccessComponent } from './components/stripe/success/success.component';
import { ListaAzioniUserComponent } from './components/lista-azioni-user/lista-azioni-user.component';
import { StockTransactionComponent } from './components/stock-transaction/stock-transaction.component';
import { ConfirmModalComponent } from './components/stripe/checkout/confirm-modal/confirm-modal.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CurrencyFormatPipe } from './pipes/currency-format.pipe';
import { IscrizioneNewsletterComponent } from './components/home/iscrizione-newsletter/iscrizione-newsletter.component';
import { PrelevaModalComponent } from './components/profilo/preleva-modal/preleva-modal.component';
import { DepositaModalComponent } from './components/profilo/deposita-modal/deposita-modal.component';
import { SocialMediaLinComponent } from './components/social-media-lin/social-media-lin.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
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

    GoogleLoginComponent,
     CalendarioComponent,
     CancelComponent,

     CheckoutComponent,
     SuccessComponent,
     ListaAzioniUserComponent,
     StockTransactionComponent,
     ConfirmModalComponent,
     CurrencyFormatPipe,
     IscrizioneNewsletterComponent,
     PrelevaModalComponent,
     DepositaModalComponent,
     SocialMediaLinComponent,

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPopoverModule,
    NgbDatepickerModule,
     FormsModule, 
     NgbModule,
     SocialLoginModule,
     ReactiveFormsModule,
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
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
  },
  NgbActiveModal,
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '800518808424-6uhijj53k3b0qq0butjpjc0m3mcver38.apps.googleusercontent.com', {
              scopes: 'openid profile email',
            }
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('clientId')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
