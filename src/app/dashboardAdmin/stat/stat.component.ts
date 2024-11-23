import { Component, AfterViewInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { Chart, DoughnutController, BubbleController, ArcElement, Tooltip, Legend, Title, PointElement, LinearScale, CategoryScale } from 'chart.js';

Chart.register(
  DoughnutController,
  BubbleController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  PointElement,
  LinearScale,
  CategoryScale
);

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements AfterViewInit {
  constructor(private commandS: CommandeService) {}

  ngAfterViewInit() {
    this.commandS.getTop5UsersWithMostOrders().subscribe(
      (stats: any) => {
        const labels: string[] = [];
        const data: number[] = [];
        const bubbleData: any[] = [];
        const colors = ['#FF5733', '#33FF6E', '#336BFF', '#FF33E9', '#E9FF33'];

        stats.forEach((stat: [string, number], index: number) => {
          const username = stat[0];
          const orderCount = stat[1];
          labels.push(username);
          data.push(orderCount);

          // Prepare Bubble chart data
          bubbleData.push({
            x: orderCount,
            y: orderCount * 1.5,
            r: 10 + index * 2
          });
        });

        // Initialize charts
        this.initializeDoughnutChart(labels, data, colors);
        this.initializeBubbleChart(labels, bubbleData, colors);
      },
      (error) => {
        console.error('Error fetching statistics:', error);
      }
    );
  }

  // Doughnut chart initialization
  initializeDoughnutChart(labels: string[], data: number[], colors: string[]) {
    const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Orders Count',
            data: data,
            backgroundColor: colors,
            borderColor: '#FFFFFF',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14
                },
                color: '#333'
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.raw}`
              }
            }
          },
          layout: {
            padding: 20
          }
        }
      });
    }
  }

  // Bubble chart initialization
  initializeBubbleChart(labels: string[], data: any[], colors: string[]) {
    const ctx = document.getElementById('bubbleChart') as HTMLCanvasElement;
    if (ctx) {
      new Chart(ctx, {
        type: 'bubble',
        data: {
          labels: labels,
          datasets: [{
            label: 'User Order Metrics',
            data: data,
            backgroundColor: colors.map(color => color + 'CC'), // Semi-transparent colors
            borderColor: colors,
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14
                },
                color: '#333'
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  // Cast context.raw to a known type
                  const raw = context.raw as { x: number; y: number; r: number };
                  return `x: ${raw.x}, y: ${raw.y}, r: ${raw.r}`;
                }
              }
            }
            
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Order Count'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Scaled Order Count'
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
