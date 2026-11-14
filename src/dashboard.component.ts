import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BarController, BarElement, CategoryScale, Chart, DoughnutController, ArcElement, LinearScale, Tooltip } from 'chart.js';
import { categorias, LibroService } from './libro.service';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, DoughnutController, ArcElement, Tooltip);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('inventario') private inventario!: ElementRef<HTMLCanvasElement>;
  @ViewChild('stock') private stock!: ElementRef<HTMLCanvasElement>;
  private readonly libros = inject(LibroService).obtenerTodos();
  readonly inventarioPorCategoria = categorias.map(categoria => ({
    categoria,
    unidades: this.libros
      .filter(libro => libro.categoria === categoria)
      .reduce((total, libro) => total + libro.disponibles, 0),
  }));
  readonly stockCritico = this.libros.filter(libro => libro.disponibles < 10).length;
  readonly stockSaludable = this.libros.length - this.stockCritico;
  readonly totalTitulos = this.libros.length;
  private graficoInventario?: Chart<'bar'>;
  private graficoStock?: Chart<'doughnut'>;

  ngAfterViewInit(): void {
    this.graficoInventario = new Chart(this.inventario.nativeElement, {
      type: 'bar',
      data: {
        labels: this.inventarioPorCategoria.map(item => item.categoria),
        datasets: [{
          label: 'Unidades disponibles',
          data: this.inventarioPorCategoria.map(item => item.unidades),
          backgroundColor: '#2866a5',
          borderRadius: 6,
          maxBarThickness: 66,
        }],
      },
      options: {
        animation: false,
        maintainAspectRatio: false,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Unidades disponibles' } },
          x: { grid: { display: false }, ticks: { autoSkip: false } },
        },
      },
    });

    this.graficoStock = new Chart(this.stock.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Stock Crítico', 'Stock Saludable'],
        datasets: [{
          data: [this.stockCritico, this.stockSaludable],
          backgroundColor: ['#af4734', '#23785f'],
          borderWidth: 3,
          hoverOffset: 5,
        }],
      },
      options: { animation: false, maintainAspectRatio: false, cutout: '68%' },
    });
  }

  ngOnDestroy(): void {
    this.graficoInventario?.destroy();
    this.graficoStock?.destroy();
  }
}
