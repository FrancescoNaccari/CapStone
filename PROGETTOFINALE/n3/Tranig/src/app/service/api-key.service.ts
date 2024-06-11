import { Injectable } from '@angular/core';
import { environment } from '../environment/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  private apiKeys = [
    environment.apikey1,
    environment.apikey2,
    environment.apikey3,
    environment.apikey4,
    environment.apikey5,
    environment.apikey6,
    environment.apikey7,
    environment.apikey8,
    environment.apikey9,
    environment.apikey10,
    environment.apikey11,
    environment.apikey12,
    environment.apikey13,
    environment.apikey14,
    environment.apikey15,
    environment.apikey16,
    environment.apikey17,
    environment.apikey18,
    environment.apikey19,
    environment.apikey20,
    environment.apikey21,
    environment.apikey22,
    environment.apikey23,
    environment.apikey24,
    environment.apikey25,
    environment.apikey26,
    environment.apikey27,
    environment.apikey28,
    environment.apikey29,
    environment.apikey30,
    environment.apikey31,
    environment.apikey32,
    environment.apikey33,
    environment.apikey34,
    environment.apikey35,
    environment.apikey36,
    environment.apikey37,
    // environment.apikey38,
    // environment.apikey39,
    // environment.apikey40,

    // aggiungere qui altre chiavi
  ];
  private currentKeyIndex = 0;

  constructor() {}

  // Funzione per ottenere la prossima chiave API
  getNextKey(): string {
    const key = this.apiKeys[this.currentKeyIndex];
    this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    return key;
  }
}
