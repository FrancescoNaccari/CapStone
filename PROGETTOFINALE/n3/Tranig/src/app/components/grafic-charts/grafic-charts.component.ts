import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart, { LegendItem, ScriptableContext, ScriptableLineSegmentContext } from 'chart.js/auto';

@Component({
  selector: 'app-grafic-charts',
  templateUrl: './grafic-charts.component.html',
  styleUrls: ['./grafic-charts.component.scss']
})
export class GraficChartsComponent implements OnInit {
  ngOnInit(): void {
    
  }
  // @ViewChild('myChart', { static: true })
//   myChartRef!: HTMLCanvasElement | null;
//   datas: any[] = [];
//   private chart!: Chart;
//   stock: any = {}; // Add this to store stock information

//   constructor() { }

//   ngOnInit(): void {
//     this.initChart();
//   }

//   initChart(): void {
//     this.myChartRef = document.getElementById('myChart') as HTMLCanvasElement;
//     if (!this.myChartRef) return;
//     const ctx = this.myChartRef.getContext('2d');
//     if (!ctx) return

//     const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
//     const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ?  'rgb(192,75,75)' : undefined;
    
    
//     const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
//       const index = ctx.dataIndex;
//       const data = ctx.dataset.data as number[];
//       if (index === 0) {
//         return 'rgb(75, 192, 192)'; // Default color for the first point
//       }
//       return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//     };

//     const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
//       const index = ctx.dataIndex;
//       const data = ctx.dataset.data as number[];
//       if (index === 0) {
//         return 'rgb(75, 192, 192)'; // Default color for the first point
//       }
//       return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//     };
    


//     this.chart = new Chart(ctx, {
//       type: 'line',
//       data: {
//         labels: [],
//         datasets: [{
//           label: 'Stock Price',
//           data: [],
//           borderColor: 'rgb(75, 192, 192)',
//           segment: {
//             borderColor: ctx => skipped(ctx) || down(ctx),
//             borderDash: ctx => skipped(ctx)? [6, 6] : undefined},
//           borderWidth: 1,
//           pointBackgroundColor: getPointBackgroundColor,
//           pointBorderColor: getPointBorderColor
//         }]
//       },
//       options: {
//         responsive: true,
//         maintainAspectRatio: true,
//          animation: {
//       duration: 1100, // Durata dell'animazione in millisecondi
//       easing: 'linear' // Tipo di easing dell'animazione
//     },
//         scales: {
//           y: {
//             beginAtZero: true,
//             ticks: {
//               color: 'white' // Color of the Y-axis labels// Colore dell'asse Y del grafico
//             },
//             grid: {
//               color: 'rgba(255, 255, 255, 0.2)' // Color of the Y-axis grid lines/ Colore dell'asse Y dela griglia grafico
//             }
//           },
//           x: {
//             ticks: {
//               color: 'white' // Color of the X-axis labels// Colore dell'asse X del grafico
//             },
//             grid: {
//               color: '' // Color of the X-axis grid lines/ Colore dell'asse X dela griglia grafico
//             }
//           }
//         },
//         plugins: {
//           legend: {
//             display: false // Disabling default legend
//           }
//         },
//         layout: {
          
//         }
//       },
//       // plugins: [customLegendPlugin] // Register the custom legend plugin
//     });

//     // Set the canvas background to black
//     this.myChartRef.style.backgroundColor = '#122036';
//   }
//   updateChart(stockData: any): void {
//     if (this.chart) {
//       this.datas.push(stockData.price);
//       this.chart.data.labels?.push('');
//       this.chart.data.datasets[0].data = [...this.datas];
//       this.chart.update();
//     }

//     const averagePrice = this.datas.reduce((acc, price) => acc + price, 0) / this.datas.length;
//     const bestPrice = Math.max(...this.datas);

//     this.stock = {
//       name: stockData.name,
//       price: stockData.price,
//       increased: stockData.price > (this.datas.length > 1 ? this.datas[this.datas.length - 2] : 0),
//       icon: stockData.icon,
//       averagePrice: averagePrice.toFixed(2),
//       bestPrice: bestPrice.toFixed(2)
//     };
//   }
// }














































// myChartRef!: HTMLCanvasElement | null;
// private chart!: Chart;
// stock: any = {};


//   // Array per memorizzare i dati giornalieri
//   dailyData: any[] = [];
//   // Array per memorizzare i dati settimanali
//   weeklyData: any[] = [];
//   // Array per memorizzare i dati mensili
//   monthlyData: any[] = [];
//   // Array di dati corrente, utilizzato per il grafico visualizzato
//   currentData: any[] = [];

// chartType: string = 'daily'; // Tipo di grafico predefinito

// constructor() { }

// ngOnInit(): void {
//   this.initChart();
// }

// // Inizializzazione del grafico
// initChart(): void {
//   this.myChartRef = document.getElementById('myChart') as HTMLCanvasElement;
//   if (!this.myChartRef) return;
//   const ctx = this.myChartRef.getContext('2d');
//   if (!ctx) return

//   // Funzioni per determinare il colore delle linee del grafico
//   const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
//   const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ?  'rgb(192,75,75)' : undefined;

//   // Funzione per determinare il colore dei punti del grafico
//   const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
//     const index = ctx.dataIndex;
//     const data = ctx.dataset.data as number[];
//     if (index === 0) {
//       return 'rgb(75, 192, 192)'; // Colore predefinito per il primo punto
//     }
//     return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//   };

//   const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
//     const index = ctx.dataIndex;
//     const data = ctx.dataset.data as number[];
//     if (index === 0) {
//       return 'rgb(75, 192, 192)'; // Colore predefinito per il primo punto
//     }
//     return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//   };

//   // Configurazione del grafico
//   this.chart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: [],
//       datasets: [{
//         label: 'Stock Price',
//         data: [],
//         borderColor: 'rgb(75, 192, 192)',
//         segment: {
//           borderColor: ctx => skipped(ctx) || down(ctx),
//           borderDash: ctx => skipped(ctx)? [6, 6] : undefined},
//         borderWidth: 1,
//         pointBackgroundColor: getPointBackgroundColor,
//         pointBorderColor: getPointBorderColor
//       }]
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: true,
//       animation: {
//         duration: 1100,
//         easing: 'linear'
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           ticks: {
//             color: 'white' // Colore delle etichette dell'asse Y
//           },
//           grid: {
//             color: 'rgba(255, 255, 255, 0.2)' // Colore delle linee della griglia dell'asse Y
//           }
//         },
//         x: {
//           ticks: {
//             color: 'white' // Colore delle etichette dell'asse X
//           },
//           grid: {
//             color: '' // Colore delle linee della griglia dell'asse X
//           }
//         }
//       },
//       plugins: {
//         legend: {
//           display: false // Disabilitazione della legenda predefinita
//         }
//       }
//     }
//   });

//   // Impostazione del colore di sfondo del canvas
//   this.myChartRef.style.backgroundColor = '#122036';
// }

// // Funzione per aggiornare il grafico con i dati delle azioni
// updateChart(stockData: any): void {
//   const currentData = this.getCurrentDataArray();
//   currentData.push(stockData.price);

//   this.chart.data.labels?.push('');
//   this.chart.data.datasets[0].data = [...currentData];
//   this.chart.update();

//   const averagePrice = currentData.reduce((acc, price) => acc + price, 0) / currentData.length;
//   const bestPrice = Math.max(...currentData);

//   this.stock = {
//     name: stockData.name,
//     price: stockData.price,
//     increased: stockData.price > (currentData.length > 1 ? currentData[currentData.length - 2] : 0),
//     icon: stockData.icon,
//     averagePrice: averagePrice.toFixed(2),
//     bestPrice: bestPrice.toFixed(2)
//   };
// }

// // Funzione per ottenere l'array di dati corrente in base al tipo di grafico selezionato
// getCurrentDataArray(): any[] {
//   switch (this.chartType) {
//     case 'daily':
//       return this.dailyData;
//     case 'weekly':
//       return this.weeklyData;
//     case 'monthly':
//       return this.monthlyData;
//     default:
//       return this.dailyData;
//   }
// }

// // Funzione per impostare il tipo di grafico e aggiornare i dati visualizzati
// setChartType(type: string): void {
//   this.chartType = type;
//   this.chart.data.labels = this.getCurrentLabels();
//   this.chart.data.datasets[0].data = [...this.getCurrentDataArray()];
//   this.chart.update();
// }

// // Funzione per ottenere le etichette correnti in base al tipo di grafico selezionato
// getCurrentLabels(): string[] {
//   return this.getCurrentDataArray().map((_, index) => index.toString());
// }
}