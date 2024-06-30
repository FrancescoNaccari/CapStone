import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './service/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private authService: AuthService
  ) {
    // Imposta la lingua di default
    const browserLang = this.translate.getBrowserLang();
    this.languageService.setLanguage(browserLang?.match(/en|it/) ? browserLang : 'it');
    this.authService.restore();
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

}