import {Routes} from '@angular/router';
import {Dashboard} from './dashboard/dashboard.component';
import {NoContent} from './no-content';
import {GuaranteeComponent} from './guarantee/guarantee.component';
import {GuaranteeTypeComponent} from './guarantee-type/guarantee-type.component';
import {NewGuaranteeTypeComponent} from './guarantee-type/new-guarantee-type/new-guarantee-type.component';
import {EditGuaranteeTypeComponent} from './guarantee-type/edit-guarantee-type/edit-guarantee-type.component';

export const ROUTES: Routes = [
  { path: '',                         component: Dashboard },
  { path: 'dashboard',                component: Dashboard },
  { path: 'guarantees',               component: GuaranteeComponent },
  { path: 'guarantee-types',          component: GuaranteeTypeComponent },
  { path: 'guarantee-types/new',      component: NewGuaranteeTypeComponent },
  { path: 'guarantee-types/:id',      component: EditGuaranteeTypeComponent },
  { path: '**',                       component: NoContent },
];
