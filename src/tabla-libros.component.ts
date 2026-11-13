import { Component, Input, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Libro } from './libro.service';

@Component({
  selector: 'app-tabla-libros',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink],
  template: `
    <div class="tabla">
      <table mat-table [dataSource]="filas()" aria-label="Libros del catálogo">
        <ng-container matColumnDef="id">
          <th mat-header-cell *matHeaderCellDef>Código</th>
          <td mat-cell *matCellDef="let libro">{{ libro.id }}</td>
        </ng-container>
        <ng-container matColumnDef="titulo">
          <th mat-header-cell *matHeaderCellDef>Título</th>
          <td mat-cell *matCellDef="let libro">{{ libro.titulo }}</td>
        </ng-container>
        <ng-container matColumnDef="autor">
          <th mat-header-cell *matHeaderCellDef>Autor</th>
          <td mat-cell *matCellDef="let libro">{{ libro.autor }}</td>
        </ng-container>
        <ng-container matColumnDef="categoria">
          <th mat-header-cell *matHeaderCellDef>Categoría</th>
          <td mat-cell *matCellDef="let libro">{{ libro.categoria }}</td>
        </ng-container>
        <ng-container matColumnDef="disponibles">
          <th mat-header-cell *matHeaderCellDef>Disponibles</th>
          <td mat-cell *matCellDef="let libro">{{ libro.disponibles }}</td>
        </ng-container>
        <ng-container matColumnDef="accion">
          <th mat-header-cell *matHeaderCellDef>Acción</th>
          <td mat-cell *matCellDef="let libro">
            <button mat-raised-button color="primary" [routerLink]="['/libro', libro.id]"
              [attr.aria-label]="'Ver detalle de ' + libro.titulo">Ver detalle</button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="columnas"></tr>
        <tr mat-row *matRowDef="let fila; columns: columnas"></tr>
      </table>
    </div>
  `,
})
export class TablaLibrosComponent {
  readonly filas = signal<readonly Libro[]>([]);
  readonly columnas = ['id', 'titulo', 'autor', 'categoria', 'disponibles', 'accion'];

  @Input({ required: true })
  set libros(valor: readonly Libro[]) {
    this.filas.set(valor);
  }
}
