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
import { ContattaciComponent } from './components/footer/contattaci/contattaci.component';
import { PrivacyPolicyComponent } from './components/footer/privacy-policy/privacy-policy.component';
import { TerminiDiServizioComponent } from './components/footer/termini-di-servizio/termini-di-servizio.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { CheckoutComponent } from './components/stripe/checkout/checkout.component';
import { CancelComponent } from './components/stripe/cancel/cancel.component';
import { SuccessComponent } from './components/stripe/success/success.component';
import { ListaAzioniUserComponent } from './components/lista-azioni-user/lista-azioni-user.component';
import { SocialMediaLinComponent } from './components/social-media-lin/social-media-lin.component';



const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", component: HomeComponent},
  // { path: "borse", component: BorsaComponent, canActivate: [AuthGuard]},
  { path: 'termini-di-servizio', component: TerminiDiServizioComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'contattaci', component: ContattaciComponent },
  { path: 'favorites', component: FavoriteStocksComponent, canActivate: [AuthGuard]},
  { path: "profilo", component: ProfiloComponent, canActivate: [AuthGuard] },
  { path: 'newsletter', component: NewsletterComponent },
  { path:'transazioni', component: ListaAzioniUserComponent, canActivate: [AuthGuard]},
  {path:'social',component: SocialMediaLinComponent},
  
  
  { path: 'checkout',  component: CheckoutComponent, canActivate: [AuthGuard]},
  { path: 'cancel', component: CancelComponent },
  { path: 'success', component: SuccessComponent},

  { path: "error404", component: Error404Component },
  { path: "**", redirectTo: "error404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
