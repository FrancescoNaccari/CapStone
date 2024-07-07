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
export class NavbarComponent implements OnInit {
  user!: AuthData | null;
  userId: number | null = null;
  menuOpen = false;

  constructor(
    private authSrv: AuthService,
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const menuContent = document.querySelector('.menu-content');
    if (menuContent) {
      if (this.menuOpen) {
        menuContent.classList.add('show');
        menuContent.classList.remove('hide');
      } else {
        menuContent.classList.add('hide');
        menuContent.classList.remove('show');
      }
    }
  }
  

  ngOnInit(): void {
    this.authSrv.user$.subscribe((data) => {
      this.user = data;
      if (data && 'user' in data) {
        this.userId = data.user.idUtente ?? null;
      } else {
        this.userId = null;
      }
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
