import {
  Component, Input, EventEmitter, Output, QueryList,
  ContentChildren, AfterContentInit, ViewChild
} from '@angular/core';
import {ValidatableForm} from './validatable-form';
import {SimpleFormInput} from './simple-form-input.component';

@Component({
  selector: 'simple-form',
  template: `
  <form #simpleForm="ngForm" (submit)="formSubmit()">
    <ng-content></ng-content>
  </form>
  `
})

export class SimpleForm implements AfterContentInit {
  @Input() form: ValidatableForm;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('simpleForm') simpleForm: any;
  @ContentChildren(SimpleFormInput) simpleFormInputs: QueryList<SimpleFormInput>;

  ngAfterContentInit() {
    this.simpleFormInputs.forEach((input: SimpleFormInput) => {
      input.form = this;
    });
  }

  getModel(): ValidatableForm {
    return this.form;
  }

  getForm(): any {
    return this.simpleForm.form;
  }

  dirty(): boolean {
    if (this.simpleFormInputs) {
      return this
        .simpleFormInputs
        .map((input: SimpleFormInput) => input.dirty())
        .reduce((a, e) => a || e);
    }
    return this.getForm().dirty;
  }

  pristine(): boolean {
    return !this.dirty()
  }

  valid(): boolean {
    if (this.simpleFormInputs) {
      return this
        .simpleFormInputs
        .map((input: SimpleFormInput) => input.valid())
        .reduce((a, e) => a && e);
    }
    return this.getForm().valid;
  }

  invalid(): boolean {
    return !this.valid();
  }

  formSubmit(): void {
    this.submit.emit();
  }
}
