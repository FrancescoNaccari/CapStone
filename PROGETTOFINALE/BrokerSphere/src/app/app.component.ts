import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './service/language.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'BrokerSphere';
  isLoginPage: boolean = false;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.languageService.setLanguage(this.languageService.getLanguage());
    this.authService.restore();
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = (event.url === '/' || event.url.startsWith('/login'));
      }
    });
  }
}