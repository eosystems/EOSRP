import {Component, Input} from '@angular/core';
import {SimpleForm} from './simple-form.component';

@Component({
  selector: 'simple-form-input',
  template: `
  <div class="form-group" [ngClass]="{ 'has-error': !form.getControl(name).valid }">
    <label class="control-label">{{labelDisplayName}}</label>
    <input name="name" type="text"
           placeholder='{{placeholder}}'
           class="form-control"
           [(ngModel)]="form.getModel()[name]"
           [formControl]="form.getControl(name)">

    <span *ngIf="form.getControl(name).hasError('required')" class="help-block">
      必須項目です。
    </span>
    <span *ngIf="form.getControl(name).hasError('maxlength')" class="help-block">
      {{ form.getControl(name).getError('maxlength')['requiredLength'] }}文字まで入力可能です。
    </span>
    <span *ngIf="form.getControl(name).hasError('minlength')" class="help-block">
      {{ form.getControl(name).getError('minlength')['requiredLength'] }}文字まで入力可能です。
    </span>

    <!-- custom error -->
    <ng-content></ng-content>
    <!-- /custom error -->
  </div>
  `
})

export class SimpleFormInput {
  @Input() name: string;
  @Input() type: string;
  @Input() labelDisplayName: string;
  @Input() placeholder: string;

  form: SimpleForm;
}
