import {Component, Input, ViewChild, AfterViewInit} from '@angular/core';
import {SimpleForm} from './simple-form.component';

@Component({
  selector: 'simple-form-input',
  template: `
  <div class="form-group" [ngClass]="{ 'has-error': !simpleInput.valid }">
    <label class="control-label">{{labelDisplayName}}</label>
    <input name="name" type="text"
           placeholder='{{placeholder}}'
           class="form-control"
           #simpleInput="ngModel"
           [(ngModel)]="form.getModel()[name]">

    <span *ngIf="simpleInput.control.hasError('required')" class="help-block">
      必須項目です。
    </span>
    <span *ngIf="simpleInput.control.hasError('maxlength')" class="help-block">
      {{ simpleInput.control.getError('maxlength')['requiredLength'] }}文字まで入力可能です。
    </span>
    <span *ngIf="simpleInput.control.hasError('minlength')" class="help-block">
      {{ simpleInput.control.getError('minlength')['requiredLength'] }}文字まで入力可能です。
    </span>

    <!-- custom error -->
    <ng-content></ng-content>
    <!-- /custom error -->
  </div>
  `
})

export class SimpleFormInput implements AfterViewInit {
  @Input() name: string;
  @Input() type: string;
  @Input() labelDisplayName: string;
  @Input() placeholder: string;

  @ViewChild('simpleInput') simpleInput: any;

  form: SimpleForm;
  isValidatorInitialized: boolean = false;

  ngAfterViewInit() {
    if (!this.isValidatorInitialized) {
      let validators = this.form.getModel().getValidations(this.name);
      if (validators) {
        this.setValidators(validators);
      }
      this.isValidatorInitialized = true
    }
  }

  setValidators(validators: any[]) {
    this.form.getModel().getValidations(this.name);
    this.simpleInput.control.setValidators(validators);
  }

  dirty(): boolean {
    return this.simpleInput.dirty;
  }

  valid(): boolean {
    return this.simpleInput.valid;
  }
}
