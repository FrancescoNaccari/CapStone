import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthData } from 'src/app/interface/auth-data.interface';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit  {
  [x: string]: any;
  
  user!: AuthData | null
    constructor(private authSrv: AuthService,private translate: TranslateService) {
      this.translate.addLangs(['en', 'it']);
      this.translate.setDefaultLang('it'); // Imposta 'it' come lingua predefinita
      const browserLang: string = this.translate.getBrowserLang() || 'it';
      this.translate.use(browserLang.match(/en|it/) ? browserLang : 'it');
    }
    ngOnInit(): void {
      this.authSrv.user$.subscribe((data) => {
        this.user = data
      })
    }
    switchLanguage(language: string) {
      this.translate.use(language);
    }
    logout() {
      this.authSrv.logout();
    }
  
  }