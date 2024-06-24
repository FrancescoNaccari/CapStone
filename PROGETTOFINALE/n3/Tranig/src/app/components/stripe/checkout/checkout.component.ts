import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/app/environment/environment.development';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  stripePromise = loadStripe(environment.stripe);
  constructor(private http: HttpClient) {}

//   async pay(): Promise<void> {
//     // here we create a payment object
//     const payment = {
//       name: 'Iphone',
//       currency: 'usd',
//       // amount on cents *10 => to be on dollar
//       amount: 99900,
//       quantity: '1',
//       cancelUrl: 'http://localhost:4200/cancel',
//       successUrl: 'http://localhost:4200/success',
//     };

//     const stripe = await this.stripePromise;

//     // this is a normal http calls for a backend api
//     this.http
// .post(`${environment.serverUrl}/payment`, payment)
//       .subscribe((data: any) => {
//         // I use stripe to redirect To Checkout page of Stripe platform
//         stripe.redirectToCheckout({
//           sessionId: data.id,
//         });
//       });
//   }

money=100
  async pay(): Promise<void> {
    // here we create a payment object
    const payment = {
      name: 'Iphone',
      currency: 'usd',
      // amount on cents *10 => to be on dollar
      amount: this.money,
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
    };

    const stripe = await this.stripePromise;

     // Verifichiamo che stripe non sia null
     if (!stripe) {
      console.error('Stripe non è stato caricato correttamente.');
      return;
    }
   // Questa è una chiamata HTTP normale per un'API backend
   this.http.post(`${environment.serverUrl}/payment`, payment).subscribe((data: any) => {
    // Utilizzo Stripe per reindirizzare alla pagina di checkout della piattaforma Stripe
    stripe.redirectToCheckout({
      sessionId: data.id,
    }).then((result) => {
      if (result.error) {
        console.error('Errore durante il redirect a Stripe:', result.error.message);
      }
    });
  });
}
}
