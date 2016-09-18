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

  constructor(fb: FormBuilder) {
    this.typeForm = fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.maxLength(255)])],
      'description': ['']
    });

    this.guaranteeTypeForm = new GuaranteeTypeForm();
  }
}
