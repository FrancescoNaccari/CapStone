import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contattaci',
  templateUrl: './contattaci.component.html',
  styleUrls: ['./contattaci.component.scss']
})
export class ContattaciComponent {
  // onSubmit() {
  //   // Logica per l'invio del modulo di contatto
  //   alert('Il tuo messaggio è stato inviato con successo!');
  // }

  constructor(private translate: TranslateService) {}

  onSubmit() {
    // Logica per l'invio del modulo di contatto
    alert(this.translate.instant('CONTATTI.SUCCESS_MESSAGE'));
  }}
