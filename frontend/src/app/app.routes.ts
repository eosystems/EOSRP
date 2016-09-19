import { Routes, RouterModule } from '@angular/router';
import { Dashboard } from './dashboard/dashboard.component';
import { NoContent } from './no-content';
import {Guarantee} from './guarantee/guarantee.component';
import {GuaranteeType} from './guarantee-type/guarantee-type.component';
import {NewGuaranteeType} from './guarantee-type/new-guarantee-type/new-guarantee-type.component';

export const ROUTES: Routes = [
  { path: '',                 component: Dashboard },
  { path: 'dashboard',        component: Dashboard },
  { path: 'guarantees',       component: Guarantee },
  { path: 'guarantee-types',  component: GuaranteeType },
  { path: 'guarantee-types/new',  component: NewGuaranteeType },
  { path: '**',               component: NoContent },
];
