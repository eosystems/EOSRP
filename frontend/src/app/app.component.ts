/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <main>
      <navbar></navbar>
      <div class="container-fluid">
        <router-outlet></router-outlet>
      </div>
    </main>
  `
})
export class App {
}
