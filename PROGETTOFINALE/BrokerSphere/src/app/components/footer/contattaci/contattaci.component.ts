import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contattaci',
  templateUrl: './contattaci.component.html',
  styleUrls: ['./contattaci.component.scss']
})
export class ContattaciComponent {

  constructor(private translate: TranslateService) {}

  onSubmit() {
    // Logica per l'invio del modulo di contatto
    alert(this.translate.instant('CONTATTI.SUCCESS_MESSAGE'));
  }}
