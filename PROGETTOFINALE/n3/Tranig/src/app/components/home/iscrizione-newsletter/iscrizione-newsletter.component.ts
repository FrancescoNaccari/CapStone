import { Component } from '@angular/core';

@Component({
  selector: 'app-iscrizione-newsletter',
  templateUrl: './iscrizione-newsletter.component.html',
  styleUrls: ['./iscrizione-newsletter.component.scss']
})
export class IscrizioneNewsletterComponent {
  email: string = '';
  privacyAccepted: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  subscribeToNewsletter() {
    if (this.email && this.privacyAccepted) {
      // Call the newsletter subscription service
      // Here you would replace the following with an actual service call
      console.log('Subscribing with email:', this.email);
      this.successMessage = 'Subscribed successfully!';
      setTimeout(() => this.successMessage = null, 3000);
    } else {
      this.errorMessage = 'Please accept the privacy policy.';
      setTimeout(() => this.errorMessage = null, 3000);
    }
  }
}
