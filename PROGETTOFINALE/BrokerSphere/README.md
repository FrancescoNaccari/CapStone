
<!-- 
# Istallazione GENERALE
npm install chart.js 
npm install chartjs-plugin-zoom
npm i bootstrap@5.3.3
npm install @auth0/angular-jwt
ng add @ng-bootstrap/ng-bootstrap

### installazione solo login google
npm i @abacritt/angularx-social-login@2.1.0  
### installazione solo pagamenti stripe
npm install @stripe/stripe-js

### installazione solo ngx-editor  (per le newsletters)
npm i ngx-editor@16.0.1



 ### installazione solo per la traduzione
npm install @ngx-translate/core @ngx-translate/http-loader -->

<!-- ## Come avviare il programma
1. cambiare nel sito di strime nella sezione webhook (il lick di webhook utilizzato )
per il li lick andare sulla powerSell e utilizzare il commando ngrok http 8888 e copiare l'indirizzo 
es. (https://aaxx-xxx-xx-xxx-xxx.ngrok-free.app )
ps.  se non istallato in precedenza installare sulla powersell il seguente commando : choco install ngrok
2. npm run startCompleto

# API  
https://rapidapi.com/it/twelve-data1-twelve-data-default/api/twelve-data1/ -->


<!-- ## palette COLORI -->
<!-- Aquamarine Tint (#09eab4)
Pale Turquoise Tint (#93fcec)
Dark Slate Grey Tint (#0c3c4c)
Grey Tint (#7a7985)
Silver Tint (#bcbabc)
Midnight Blue Shade (#2c2443)
Blu Scuro:
Hex: #0E1229
Utilizzato per sfondi e sezioni principali del sito.
Blu:
Hex: #1B264F
Impiegato per elementi di navigazione e titoli.
Bianco:
Hex: #FFFFFF
Usato per il testo principale e sfondi secondari.
Grigio Chiaro:
Hex: #F2F5FA
Utilizzato per sfondi e separatori di sezioni.
Verde Chiaro:
Hex: #23B373
Usato per indicare variazioni di prezzo positive.
Rosso:
Hex: #E15241
Utilizzato per indicare variazioni di prezzo negative. -->
<!-- 1. Blu Scuro: #0E1229 - Utilizzato per sfondi e sezioni principali del sito.
2. Blu: #1B264F - Impiegato per elementi di navigazione e titoli.
3. Bianco: #FFFFFF - Usato per il testo principale e sfondi secondari.
4. Grigio Chiaro: #F2F5FA - Utilizzato per sfondi e separatori di sezioni.
5. Verde Chiaro: #23B373 - Usato per indicare variazioni di prezzo positive.
 6. Rosso: #E15241 - Utilizzato per indicare variazioni di prezzo negative.

7. Verde Acqua: #09eab4 - Spesso utilizzato per elementi grafici e pulsanti.
8. Turchese Chiaro: #93fcec - Utilizzato per accentuare alcune sezioni.
9. Blu Petrolio: #0c3c4c - Impiegato per titoli e testi secondari.
10. Grigio Medio: #7a7985 - Utilizzato per testi secondari e icone.
11. Grigio Argento: #bcbabc - Per bordi e linee di separazione.
12. Blu Notte: #2c2443 - Utilizzato per sfondi scuri e contrasti​ 




1. #12192B --blu scuro sbiadito-- Usato per lo sfondo generale
2. #0B1426 --blu scuro --         usato per navbar 
3. #122036 --blu un pò scuro--    per grafico 
4. #122F4D --blu petrolio --       per le card

5. #2EA5FB --azzuro --per bottoni 
6. #1199FA --azzuro scuro-- per i titoli/icone
7. #FFFFFF -- bianco-- per titoli(h1-h2)

8. #00A68C --verde-- per gli aumenti
9. #D9475A --rosso-- per le diminuzioni



# API  
https://rapidapi.com/it/twelve-data1-twelve-data-default/api/twelve-data1/ -->

# BrokerSphere

Benvenuti a **BrokerSphere**, una piattaforma avanzata per la gestione delle operazioni di borsa. Questo progetto combina tecnologie moderne per offrire una soluzione completa per il monitoraggio delle variazioni delle azioni, l'acquisto e la vendita, la gestione del conto e molto altro. Il sito è disponibile sia in italiano che in inglese, rendendolo accessibile a un pubblico globale.

## Tecnologie Utilizzate
BrokerSphere è stato sviluppato utilizzando una varietà di tecnologie all'avanguardia per garantire prestazioni, sicurezza e facilità d'uso:

- **Frontend**: Angular, NG Bootstrap, Bootstrap
- **Backend**: Java, IntelliJ, Spring Boot
- **Grafici**: Chart.js
- **Pagamenti**: Stripe
- **Autenticazione**: @auth0/angular-jwt, @abacritt/angularx-social-login
- **Editor Newsletter**: ngx-editor
- **Traduzione**: @ngx-translate/core, @ngx-translate/http-loader
- **API Dati Finanziari**: [Twelve Data API](https://rapidapi.com/it/twelve-data1-twelve-data-default/api/twelve-data1/)

## Funzionalità Principali
- **Monitoraggio delle Azioni**: Visualizzazione in tempo reale delle variazioni delle azioni con grafici dettagliati.
- **Acquisto e Vendita**: Facilità di acquisto e vendita delle azioni con un sistema di transazioni sicuro.
- **Gestione Conto**: Registrazione utenti, ricarica del conto, prelievo di fondi e tracciamento delle transazioni.
- **Sezione Preferiti**: Salva e monitora le tue azioni preferite.
- **Newsletter**: Amministratori possono gestire e inviare newsletter.
- **Multilingua**: Disponibile in italiano e inglese per un'ampia accessibilità.
- **Responsive Design**: Layout completamente responsive per una perfetta visualizzazione su dispositivi mobili e desktop.

## Installazione Generale
Per iniziare con BrokerSphere, segui questi passaggi per installare le dipendenze necessarie:

```bash
npm install chart.js 
npm install chartjs-plugin-zoom
npm i bootstrap@5.3.3
npm install @auth0/angular-jwt
ng add @ng-bootstrap/ng-bootstrap
