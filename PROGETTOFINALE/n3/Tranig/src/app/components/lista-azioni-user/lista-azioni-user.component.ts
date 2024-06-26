import { Component, Input, OnInit } from '@angular/core';
import { Stock } from 'src/app/interface/stock.interface';

@Component({
  selector: 'app-lista-azioni-user',
  templateUrl: './lista-azioni-user.component.html',
  styleUrls: ['./lista-azioni-user.component.scss']
})
export class ListaAzioniUserComponent implements OnInit {
  @Input() stocks: Stock[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
