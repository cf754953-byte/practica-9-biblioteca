import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LibroService } from './libro.service';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  template: `
    <h1>Ficha técnica</h1>
    <mat-card appearance="outlined" class="ficha">
      @if (libro(); as item) {
        <mat-card-header><mat-card-title>{{ item.titulo }}</mat-card-title></mat-card-header>
        <mat-card-content>
          <dl>
            <div><dt>Código</dt><dd>{{ item.id }}</dd></div>
            <div><dt>Autor</dt><dd>{{ item.autor }}</dd></div>
            <div><dt>Categoría</dt><dd>{{ item.categoria }}</dd></div>
            <div><dt>Ejemplares disponibles</dt><dd>{{ item.disponibles }}</dd></div>
          </dl>
        </mat-card-content>
      } @else {
        <mat-card-content><p>No se encontró el libro solicitado.</p></mat-card-content>
      }
      <mat-card-actions><button mat-raised-button color="primary" routerLink="/">Volver al catálogo</button></mat-card-actions>
    </mat-card>
  `,
})
export class DetalleLibroComponent {
  private readonly ruta = inject(ActivatedRoute);
  private readonly servicio = inject(LibroService);
  private readonly parametros = toSignal(this.ruta.paramMap, { initialValue: this.ruta.snapshot.paramMap });
  readonly libro = computed(() => this.servicio.buscarPorId(this.parametros().get('id') ?? ''));
}
