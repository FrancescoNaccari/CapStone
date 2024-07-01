import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: string;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang || 'it';
    this.initializeLanguage();
  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  getLanguage(): string {
    return this.currentLanguage;
  }

  private initializeLanguage() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      this.setLanguage(savedLanguage);
    } else {
      this.setLanguage(this.currentLanguage);
    }
  }
}
