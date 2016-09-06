import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';
import { NoContent } from './no-content';
import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',           component: Dashboard },
  { path: 'dashboard',  component: Dashboard },
  { path: '**',         component: NoContent },
];
