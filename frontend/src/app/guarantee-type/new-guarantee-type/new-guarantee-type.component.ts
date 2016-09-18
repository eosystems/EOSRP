import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GuaranteeTypeForm} from '../../models/guarantee-type-form';
import {GuaranteeTypeService} from '../guarantee-type.service';

@Component({
  selector: 'new-guarantee-type',
  templateUrl: './new-guarantee-type.template.html'
})

export class NewGuaranteeType {
  typeForm: FormGroup;
  guaranteeTypeForm: GuaranteeTypeForm;

  constructor(private guaranteeTypeService: GuaranteeTypeService) {
    this.guaranteeTypeForm = new GuaranteeTypeForm();
    this.typeForm = this.guaranteeTypeForm.toFormGroup();
  }

  formSubmit() {
    this
      .guaranteeTypeService
      .create(this.guaranteeTypeForm)
      .subscribe(
        r => {
          console.log("Success");
        },
        e => {
          console.log("ERROR");
        }
      )
  }
}
