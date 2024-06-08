import { Routes } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
export const routes: Routes = [
  { path: '', redirectTo: '/todo', pathMatch: 'full' }, // Definindo a página inicial
  { path: 'todo', component: TodoComponent },
];
