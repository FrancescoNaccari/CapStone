import { Component } from '@angular/core';
import { Chart, ScriptableContext, ScriptableLineSegmentContext } from 'chart.js';
import { TwelveDataService } from 'src/app/service/twelve-data.service';

@Component({
  selector: 'app-grafico-finanziario',
  templateUrl: './grafico-finanziario.component.html',
  styleUrls: ['./grafico-finanziario.component.scss']
})
export class GraficoFinanziarioComponent {


//   myChartRef!: HTMLCanvasElement | null; // Riferimento al canvas del grafico
//   private chart!: Chart; // Istanza del grafico
//   stock: any = {}; // Oggetto per memorizzare i dettagli dello stock




//   ngOnInit(): void {
//     this.initChart();
//   }
  
//   // Inizializzazione del grafico
//   initChart(): void {
//     this.myChartRef = document.getElementById('myChart') as HTMLCanvasElement;
//     if (!this.myChartRef) return;
//     const ctx = this.myChartRef.getContext('2d');
//     if (!ctx) return
  
//     // Funzioni per determinare il colore delle linee del grafico
//     const skipped = (ctx: ScriptableLineSegmentContext) => ctx.p0.skip || ctx.p1.skip ? 'rgba(0,0,0,0.2)' : undefined;
//     const down = (ctx: ScriptableLineSegmentContext) => ctx.p0.parsed.y > ctx.p1.parsed.y ?  'rgb(192,75,75)' : undefined;
  
//     // Funzione per determinare il colore dei punti del grafico
//     const getPointBackgroundColor = (ctx: ScriptableContext<'line'>) => {
//       const index = ctx.dataIndex;
//       const data = ctx.dataset.data as number[];
//       if (index === 0) {
//         return 'rgb(75, 192, 192)'; // Colore predefinito per il primo punto
//       }
//       return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//     };
  
//     const getPointBorderColor = (ctx: ScriptableContext<'line'>) => {
//       const index = ctx.dataIndex;
//       const data = ctx.dataset.data as number[];
//       if (index === 0) {
//         return 'rgb(75, 192, 192)'; // Colore predefinito per il primo punto
//       }
//       return data[index] > data[index - 1] ? 'rgb(75, 192, 75)' : 'red';
//     };
  
//     // Configurazione del grafico
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
//         animation: {
//           duration: 1100,
//           easing: 'linear'
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             ticks: {
//               color: 'white' // Colore delle etichette dell'asse Y
//             },
//             grid: {
//               color: 'rgba(255, 255, 255, 0.2)' // Colore delle linee della griglia dell'asse Y
//             }
//           },
//           x: {
//             ticks: {
//               color: 'white' // Colore delle etichette dell'asse X
//             },
//             grid: {
//               color: '' // Colore delle linee della griglia dell'asse X
//             }
//           }
//         },
//         plugins: {
//           legend: {
//             display: false // Disabilitazione della legenda predefinita
//           }
//         }
//       }
//     });
  
//     // Impostazione del colore di sfondo del canvas
//     this.myChartRef.style.backgroundColor = '#122036';
//   }
  
 
// // 

}