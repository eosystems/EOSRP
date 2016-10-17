import {NgModule, ApplicationRef} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import {RouterModule} from '@angular/router';
import {removeNgStyles, createNewHosts} from '@angularclass/hmr';

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
import {GuaranteeComponent} from './guarantee/guarantee.component';
import {GuaranteeTypeComponent} from './guarantee-type/guarantee-type.component';
import {Ng2SearchTableModule} from 'ng2-search-table/ng2-search-table';
import {NewGuaranteeTypeComponent} from './guarantee-type/new-guarantee-type/new-guarantee-type.component';
import {GuaranteeTypeService} from './guarantee-type/guarantee-type.service';
import {NewSrpRequestComponent} from './srp-request/new-srp-request/new-srp-request.component';
import {SrpRequestComponent} from './srp-request/srp-request.component';
import {ZkillService} from './zkill/zkill.service';
import {SrpRequestService} from './srp-request/srp-request.service';
import {SrpDestinationService} from './srp-destination/srp-destination.service';
import {ToastModule} from 'ng2-toastr';
import {SimpleForm} from './common/simple-form/simple-form.component';
import {SimpleFormInput} from './common/simple-form/simple-form-input.component';
import {EditGuaranteeTypeComponent} from './guarantee-type/edit-guarantee-type/edit-guarantee-type.component';
import {ModalDirective, ModalModule, PaginationModule} from 'ng2-bootstrap';
import {HotTable} from './common/handsontable/handsontable';
import {EditGuaranteeComponent} from './guarantee/edit-guarantee/edit-guarantee.component';
import {GuaranteeService} from './guarantee/guarantee.service';
import {GuaranteeSharedService} from './guarantee/guarantee-shared.service';
import {Ng2TokenAuthModule, TokenAuthHttp} from './common/ng2-token-auth/ng2-token-auth.module';
import {SignInComponent} from './signin/signin.component';
import {SignInFinalizeComponent} from './signin/signin-finalize.component';

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
    SignInComponent,
    SignInFinalizeComponent,
    GuaranteeComponent,
    EditGuaranteeComponent,
    GuaranteeTypeComponent,
    NewGuaranteeTypeComponent,
    EditGuaranteeTypeComponent,
    SrpRequestComponent,
    NewSrpRequestComponent,
    SimpleForm,
    SimpleFormInput
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false }),
    Ng2SearchTableModule.forRoot(),
    ToastModule,
    ModalModule,
    PaginationModule,
    Ng2TokenAuthModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    GuaranteeTypeService,
    GuaranteeService,
    GuaranteeSharedService,
    SrpRequestService,
    ZkillService,
    SrpDestinationService,
    {
      provide: Http,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new TokenAuthHttp(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
    }
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
