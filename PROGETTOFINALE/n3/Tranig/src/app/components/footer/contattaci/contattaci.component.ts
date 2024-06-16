import { Component } from '@angular/core';

@Component({
  selector: 'app-contattaci',
  templateUrl: './contattaci.component.html',
  styleUrls: ['./contattaci.component.scss']
})
export class ContattaciComponent {
  onSubmit() {
    // Logica per l'invio del modulo di contatto
    alert('Il tuo messaggio è stato inviato con successo!');
  }
}
