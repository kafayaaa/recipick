import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'pick', loadComponent: () => import('./pages/pick/pick').then((m) => m.Pick) },
];
