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
    this.languageService.setLanguage(this.languageService.getLanguage());
    this.authService.restore();
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
}