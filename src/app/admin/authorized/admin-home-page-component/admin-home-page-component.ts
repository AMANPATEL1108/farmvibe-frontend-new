import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-admin-home-page-component',
  templateUrl: './admin-home-page-component.html',
  styleUrls: ['./admin-home-page-component.css'],
})
export class AdminHomePageComponent implements AfterViewInit {
  @ViewChild('dailyOrdersChart')
  dailyOrdersChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('ordersByCategoryChart')
  ordersByCategoryChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('revenueChart') revenueChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(private router: Router) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initDailyOrdersChart();
    this.initOrdersByCategoryChart();
    this.initRevenueChart();
  }

  initDailyOrdersChart() {
    new Chart(this.dailyOrdersChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Orders',
            data: [420, 470, 380, 510, 650, 780, 620],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129,0.3)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#fff' } } },
        scales: {
          x: { ticks: { color: '#fff' } },
          y: { ticks: { color: '#fff' } },
        },
      },
    });
  }

  initOrdersByCategoryChart() {
    new Chart(this.ordersByCategoryChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Fruits', 'Vegetables', 'Dairy', 'Poultry', 'Nuts'],
        datasets: [
          {
            label: 'Category Orders',
            data: [820, 610, 520, 410, 325],
            backgroundColor: [
              '#34D399',
              '#60A5FA',
              '#FBBF24',
              '#F87171',
              '#A78BFA',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#fff' } } },
      },
    });
  }

  initRevenueChart() {
    new Chart(this.revenueChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Revenue (₹)',
            data: [8200, 9400, 10500, 8700, 9600, 11200, 12000],
            backgroundColor: '#10B981',
            borderRadius: 5,
            barThickness: 20,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: '#fff' } },
          y: { ticks: { color: '#fff', callback: (val: any) => `₹${val}` } },
        },
      },
    });
  }

  adminRegister() {
    this.router.navigate(['/farmvibe/authorized/admin/admin-register']);
  }
}
