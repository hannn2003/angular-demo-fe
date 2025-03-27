// import { Component } from '@angular/core';
// import { ConfigHeader } from '@vks/app/pages/account-management/models';
// import { IAccountInfo } from '@vks/app/https/account-management/interfaces';

// @Component({
//   selector: 'vks-dashboard',
//   templateUrl: './dashboard.component.html',
//   styleUrl: './dashboard.component.scss',
// })
// export class DashboardComponent {
//   readonly title = 'Danh sách tài khoản';
//   readonly configHeader = ConfigHeader;
//   data: any;
//   options: any;
//   doughnutData: any;
//   doughnutOptions: any;
//   listAccount: IAccountInfo[] = [];

//   ngOnInit() {
//     this.initVerticalBar();
//     this.initDoughnut();
//   }

//   initVerticalBar() {
//     this.data = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//         {
//           label: 'Vụ án hình sự',
//           backgroundColor: '#3b82f6',
//           borderColor: '#3b82f6',
//           data: [65, 59, 80, 81, 56, 55, 40],
//         },
//         {
//           label: 'Vụ án dân sự',
//           backgroundColor: '#ef4444',
//           borderColor: '#ef4444',
//           data: [28, 48, 40, 19, 86, 27, 90],
//         },
//       ],
//     };

//     this.options = {
//       maintainAspectRatio: false,
//       aspectRatio: 0.8,
//       plugins: {
//         legend: {
//           labels: {
//             color: '#6b7280',
//           },
//         },
//       },
//       scales: {
//         x: {
//           ticks: {
//             color: '#6b7280',
//             font: {
//               weight: 500,
//             },
//           },
//           grid: {
//             color: '#d1d5db',
//             drawBorder: false,
//           },
//         },
//         y: {
//           ticks: {
//             color: '#6b7280',
//           },
//           grid: {
//             color: '#d1d5db',
//             drawBorder: false,
//           },
//         },
//       },
//     };
//   }

//   initDoughnut() {
//     this.doughnutData = {
//       labels: ['Vụ án hình sự', 'Vụ án dân sự'],
//       datasets: [
//         {
//           label: 'Vụ án',
//           data: [289, 170],
//           backgroundColor: ['#3b82f6', '#ef4444'],
//           hoverOffset: 4,
//         },
//       ],
//     };

//     this.doughnutOptions = {
//       maintainAspectRatio: false,
//       aspectRatio: 1,
//       plugins: {
//         legend: {
//           labels: {
//             color: '#6b7280',
//           },
//         },
//       },
//     };
//   }
// }

import { Component } from '@angular/core';
import { ConfigHeader } from '@vks/app/pages/account-management/models';
import { IAccountInfo } from '@vks/app/https/account-management/interfaces';

@Component({
  selector: 'vks-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  readonly title = 'Danh sách tài khoản';
  readonly configHeader = ConfigHeader;
  data: any;
  options: any;
  doughnutData: any;
  doughnutOptions: any;
  listAccount: IAccountInfo[] = [];

  ngOnInit() {
    this.initLineChart();
    this.initDoughnut();
  }

  initLineChart() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Vụ án hình sự',
          fill: false,
          borderColor: '#3b82f6',
          data: [65, 59, 80, 81, 56, 55, 40],
          tension: 0.4,
        },
        {
          label: 'Vụ án dân sự',
          fill: false,
          borderColor: '#ef4444',
          data: [28, 48, 40, 19, 86, 27, 90],
          tension: 0.4,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: '#6b7280',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#6b7280',
            font: {
              weight: 500,
            },
          },
          grid: {
            color: '#d1d5db',
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#6b7280',
          },
          grid: {
            color: '#d1d5db',
            drawBorder: false,
          },
        },
      },
    };
  }

  initDoughnut() {
    this.doughnutData = {
      labels: ['Vụ án hình sự', 'Vụ án dân sự'],
      datasets: [
        {
          label: 'Vụ án',
          data: [289, 170],
          backgroundColor: ['#3b82f6', '#ef4444'],
          hoverOffset: 4,
          borderWidth: 2,
        },
      ],
    };

    this.doughnutOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#6b7280',
            font: {
              weight: 'bold',
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem: any) {
              const total = tooltipItem.dataset.data.reduce(
                (a: any, b: any) => a + b,
                0
              );
              const value = tooltipItem.raw;
              const percentage = ((value / total) * 100).toFixed(2);
              return `${tooltipItem.label}: ${percentage}%`;
            },
          },
        },
      },
    };
  }
}
