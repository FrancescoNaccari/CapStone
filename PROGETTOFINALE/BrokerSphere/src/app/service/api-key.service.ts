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
    environment.apikey38,
    environment.apikey39,
    environment.apikey40,
    environment.apikey41,
    environment.apikey42,
    environment.apikey43,
    environment.apikey44,
    environment.apikey45,
    environment.apikey46,
    environment.apikey47,
    environment.apikey48,
    environment.apikey49,
    environment.apikey50,
    environment.apikey51,
    environment.apikey52,
    environment.apikey53,
    environment.apikey54,
    environment.apikey55,
    environment.apikey56,
    environment.apikey57,
    environment.apikey58,
    environment.apikey59,
    environment.apikey60,
    environment.apikey61,
    environment.apikey62,
    environment.apikey63,
    environment.apikey64,
    environment.apikey65,
    environment.apikey66,
    environment.apikey67,
    environment.apikey68,
    environment.apikey69,
    environment.apikey70,
    environment.apikey71,
    environment.apikey72,
    // environment.apikey73,
    // environment.apikey74,
    // environment.apikey75,

    // aggiungere qui altre chiavi
  ];
 
  private keyUsage: { [key: string]: number } = {};
  private currentKeyIndex = 0;
  private limitPerKey = 8;
  private resetInterval = 60000; // 60 seconds

  constructor() {
    this.apiKeys.forEach(key => this.keyUsage[key] = 0);
    setInterval(() => this.resetUsage(), this.resetInterval);
  }

  // Funzione per ottenere la prossima chiave API
  getNextKey(): string {
    const key = this.apiKeys[this.currentKeyIndex];
    this.keyUsage[key]++;

    // Se il limite di chiamate per chiave è raggiunto, passa alla chiave successiva
    if (this.keyUsage[key] >= this.limitPerKey) {
      this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    }

    return key;
  }

  // Funzione per resettare il conteggio delle chiamate
  private resetUsage(): void {
    this.apiKeys.forEach(key => this.keyUsage[key] = 0);
  }
}
