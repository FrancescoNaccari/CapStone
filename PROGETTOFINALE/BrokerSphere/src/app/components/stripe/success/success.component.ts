import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LanguageService } from 'src/app/service/language.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements   OnInit {
  countdown: number = 5; // Imposta il timer a 5 secondi

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const lang = params['lang'];
      if (lang) {
        this.languageService.setLanguage(lang);
      }
    });

    this.authService.restore(); // Ripristina lo stato dell'utente

    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/profilo']);
      }
    }, 1000);
  }
}
