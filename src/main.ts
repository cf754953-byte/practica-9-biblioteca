import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet, provideRouter } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HomeComponent } from './home.component';
import { DetalleLibroComponent } from './detalle-libro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <mat-toolbar color="primary" class="masthead">
      <div class="masthead-inner">
        <span class="brand">Biblioteca Universitaria</span>
        <nav aria-label="Navegación principal">
          <button mat-button [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" ariaCurrentWhenActive="page">Catálogo</button>
          <button mat-button [routerLink]="['/dashboard']" routerLinkActive="active" ariaCurrentWhenActive="page">Dashboard</button>
        </nav>
      </div>
    </mat-toolbar>
    <main><router-outlet /></main>
  `,
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter([
    { path: '', component: HomeComponent, title: 'Catálogo | Biblioteca Universitaria' },
    {
      path: 'dashboard',
      loadComponent: () => import('./dashboard.component').then(module => module.DashboardComponent),
      title: 'Dashboard | Biblioteca Universitaria',
    },
    { path: 'libro/:id', component: DetalleLibroComponent, title: 'Ficha técnica | Biblioteca Universitaria' },
    { path: '**', redirectTo: '' },
  ])],
}).catch(console.error);
