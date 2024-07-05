import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { AuthService } from 'src/app/service/auth.service';
import { LanguageService } from 'src/app/service/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit {
  user!: AuthData | null;

  constructor(
    private authSrv: AuthService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      this.user = data;
    });
    this.languageService.setLanguage(this.languageService.getLanguage());
  }

  switchLanguage(language: string) {
    this.languageService.setLanguage(language);
  }

  logout() {
    this.authSrv.logout();
  }
  }