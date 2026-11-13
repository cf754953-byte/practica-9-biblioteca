import { Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Categoria, categorias, LibroService } from './libro.service';
import { TablaLibrosComponent } from './tabla-libros.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatSelectModule, TablaLibrosComponent],
  template: `
    <h1>Catálogo de libros</h1>
    <mat-card appearance="outlined" class="filtro">
      <mat-card-content>
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Categoría</mat-label>
          <mat-select [value]="categoria()" (selectionChange)="categoria.set($event.value)">
            <mat-option value="">Todas las categorías</mat-option>
            @for (opcion of categorias; track opcion) {
              <mat-option [value]="opcion">{{ opcion }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
        <p class="conteo" role="status">{{ libros().length }} libros</p>
      </mat-card-content>
    </mat-card>
    <app-tabla-libros [libros]="libros()" />
  `,
})
export class HomeComponent {
  private readonly servicio = inject(LibroService);
  readonly categorias = categorias;
  readonly categoria = signal<Categoria | ''>('');
  readonly libros = computed(() => {
    const categoria = this.categoria();
    return categoria ? this.servicio.filtrarPorCategoria(categoria) : this.servicio.obtenerTodos();
  });
}
