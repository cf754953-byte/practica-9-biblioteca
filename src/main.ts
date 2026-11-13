import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet, provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { DetalleLibroComponent } from './detalle-libro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<header class="masthead"><div>Biblioteca Universitaria</div></header><main><router-outlet /></main>',
})
class AppComponent {}

bootstrapApplication(AppComponent, {
  providers: [provideRouter([
    { path: '', component: HomeComponent, title: 'Catálogo | Biblioteca Universitaria' },
    { path: 'libro/:id', component: DetalleLibroComponent, title: 'Ficha técnica | Biblioteca Universitaria' },
    { path: '**', redirectTo: '' },
  ])],
}).catch(console.error);
