import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgbModal, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/app/environment/environment.development';
import { User } from 'src/app/interface/user.interface';
import { AuthService } from 'src/app/service/auth.service';
import { ProfiloService } from 'src/app/service/profilo.service';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  @Input() rechargeAmount: number = 0;
  @Input() withdrawAmount: number = 0;
  @Input() userId: string|undefined| null = ''; 
  @Output() paymentSuccess = new EventEmitter<void>();

  @ViewChild('rechargePopover', { static: false }) rechargePopover!: NgbPopover;
  @ViewChild('withdrawPopover', { static: false }) withdrawPopover!: NgbPopover;
  @ViewChild('confirmModal', { static: false }) confirmModal!: ElementRef;
  stripePromise = loadStripe(environment.stripe);
user:User|undefined;
alertMessage: string | null = null;
  constructor(private http: HttpClient, private authSrv:AuthService,private profiloSrv: ProfiloService,private modalService: NgbModal) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe(user => {
      if (user?.user) {
        this.user = user.user;
      } else {
        this.user = undefined;
      }
    });
    }
      
   


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


  async pay(amount: number): Promise<void> {
  
    // here we create a payment object

    const payment = {

      name: 'ricarica',
      currency: 'eur',//moneta
    
      amount: amount * 100,// Importo in centesimi
      quantity: '1',
      cancelUrl: 'http://localhost:4200/cancel',
      successUrl: 'http://localhost:4200/success',
      clientReferenceId: this.user?.idUtente
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
      console.log(result);
      if (result.error) {
        console.error('Errore durante il redirect a Stripe:', result.error.message);
      }else {
      
          this.paymentSuccess.emit();
       
      }
    });
  });
}
recharge() {
  if (this.rechargeAmount > 0) {
    this.pay(this.rechargeAmount);
  } else {
    this.showPopover(this.rechargePopover);
  }
}
withdraw() {
  if (this.withdrawAmount > 0) {
    const modalRef = this.modalService.open(ConfirmModalComponent);
    modalRef.componentInstance.amount = this.withdrawAmount;

    modalRef.result.then((result) => {
      if (result) {
        if (this.user?.idUtente) {
          this.profiloSrv.withdrawBalance(this.user.idUtente, this.withdrawAmount).subscribe(
            () => {
              this.paymentSuccess.emit();
              this.showSuccessAlert(`Hai prelevato con successo ${this.withdrawAmount} € dal tuo metodo di pagamento.`);
            },
            (error) => console.error('Errore durante il prelievo', error)
          );
        } else {
          console.error('User ID is undefined');
        }
      }
    }, (reason) => {
      console.log('Prelievo annullato:', reason);
    });
  } else {
    this.showPopover(this.withdrawPopover);
  }
}
  showPopover(popover: NgbPopover) {
    popover.open();
    setTimeout(() => popover.close(), 3000); // Nasconde il popover dopo 3 secondi
  }

  showSuccessAlert(message: string) {
    this.alertMessage = message;
    setTimeout(() => this.alertMessage = null, 4000); // Nasconde l'alert dopo 3 secondi
  }
}
