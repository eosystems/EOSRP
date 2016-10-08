import {NgModule} from '@angular/core/src/metadata/ng_module';
import {HttpModule} from '@angular/http';
import {TokenAuthHttp} from './token-auth-http';
import {Ng2TokenAuthService} from './ng2-token-auth.service';

@NgModule({
  imports: [
    HttpModule
  ],
  declarations: [
  ],
  exports: [
  ],
  providers: [
    Ng2TokenAuthService,
    TokenAuthHttp,
  ]
})

export class Ng2TokenAuthModule {}

export * from './token-auth-http';
export * from './ng2-token-auth.service';
