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
  constructor(private route: ActivatedRoute, private router: Router, private languageService: LanguageService, private authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const lang = params['lang'];
      if (lang) {
        this.languageService.setLanguage(lang);
      }
    });

    this.authService.restore(); // Ripristina lo stato dell'utente

    setTimeout(() => {
      this.router.navigate(['/profilo']);
    }, 5000);
  }
}
