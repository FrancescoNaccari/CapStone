import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguage: string;

  constructor(private translate: TranslateService) {
    this.currentLanguage = translate.currentLang || 'it';
  }

  setLanguage(language: string): void {
    this.currentLanguage = language;
    this.translate.use(language);
  }

  getLanguage(): string {
    return this.currentLanguage;
  }
}
