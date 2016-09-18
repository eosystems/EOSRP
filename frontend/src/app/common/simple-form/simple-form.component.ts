import {
  Component, Input, EventEmitter, Output, QueryList, ViewChildren, OnInit, AfterViewInit,
  ContentChildren, AfterContentInit
} from '@angular/core';
import {ValidatableForm} from './validatable-form';
import {FormGroup, FormControl, AbstractControl} from '@angular/forms';
import {SimpleFormInput} from './simple-form-input.component';

@Component({
  selector: 'simple-form',
  template: `
  <form [formGroup]="formGroup" (submit)="formSubmit()">
    <ng-content></ng-content>
  </form>
  `
})

export class SimpleForm implements OnInit, AfterContentInit {
  @Input() form: ValidatableForm;
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(SimpleFormInput) simpleFormInputs: QueryList<SimpleFormInput>;

  myself: SimpleForm;
  formGroup: FormGroup;

  ngOnInit() {
    this.myself = this;
    this.formGroup = this.form.toFormGroup();
  }

  ngAfterContentInit() {
    this.simpleFormInputs.forEach((input: SimpleFormInput) => {
      input.form = this.myself;
    });
  }

  getModel(): ValidatableForm {
    return this.form;
  }

  getForm(): FormGroup {
    return this.formGroup;
  }

  dirty(): boolean {
    return this.getForm().dirty;
  }

  pristine(): boolean {
    return this.getForm().pristine;
  }

  valid(): boolean {
    return this.getForm().valid;
  }

  getControl(key: string): AbstractControl {
    return this.formGroup.controls[key];
  }

  formSubmit(): void {
    this.submit.emit();
  }
}
