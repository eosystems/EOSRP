import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { Dashboard } from './dashboard/dashboard.component';
import { NoContent } from './no-content';
import {NavBar} from './navbar/navbar.component';
import {Guarantee} from './guarantee/guarantee.component';
import {GuaranteeType} from './guarantee-type/guarantee-type.component';
import {Ng2SearchTableModule} from 'ng2-search-table/ng2-search-table';
import {NewGuaranteeType} from './guarantee-type/new-guarantee-type/new-guarantee-type.component';
import {GuaranteeTypeService} from './guarantee-type/guarantee-type.service';
import {ToastModule} from 'ng2-toastr';
import {SimpleForm} from './common/simple-form/simple-form.component';
import {SimpleFormInput} from './common/simple-form/simple-form-input.component';
import {EditGuaranteeType} from './guarantee-type/edit-guarantee-type/edit-guarantee-type.component';
import {ModalDirective, ModalModule} from 'ng2-bootstrap';
import {HotTable} from './common/handsontable/handsontable';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InteralStateType,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    NoContent,
    HotTable,
    NavBar,
    Dashboard,
    Guarantee,
    GuaranteeType,
    NewGuaranteeType,
    EditGuaranteeType,
    SimpleForm,
    SimpleFormInput
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    Ng2SearchTableModule.forRoot(),
    ToastModule,
    ModalModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    GuaranteeTypeService
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}
  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    this.appState._state = store.state;
    this.appRef.tick();
    delete store.state;
  }
  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
