import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GuaranteeTypeForm} from '../../models/guarantee-type-form';

@Component({
  selector: 'new-guarantee-type',
  templateUrl: './new-guarantee-type.template.html'
})

export class NewGuaranteeType {
  typeForm: FormGroup;
  guaranteeTypeForm: GuaranteeTypeForm;

  constructor() {
    this.guaranteeTypeForm = new GuaranteeTypeForm();
    this.typeForm = this.guaranteeTypeForm.toFormGroup();
  }

  debug() {
    this.guaranteeTypeForm.name = "HELLO";
    console.log(this.guaranteeTypeForm);
  }
}
