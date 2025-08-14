import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/assess', pathMatch: 'full' },
  { path: '**', redirectTo: '/assess' }
];