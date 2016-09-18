import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GuaranteeTypeForm} from '../../models/guarantee-type-form';
import {GuaranteeTypeService} from '../guarantee-type.service';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'new-guarantee-type',
  templateUrl: './new-guarantee-type.template.html'
})

export class NewGuaranteeType {
  typeForm: FormGroup;
  guaranteeTypeForm: GuaranteeTypeForm;

  constructor(
    private guaranteeTypeService: GuaranteeTypeService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    this.guaranteeTypeForm = new GuaranteeTypeForm();
    this.typeForm = this.guaranteeTypeForm.toFormGroup();
  }

  formSubmit() {
    this.toastr.info("保存しています。", "Post");

    this
      .guaranteeTypeService
      .create(this.guaranteeTypeForm)
      .subscribe(
        r => {
          this.toastr.success("保存に成功しました。", "Success");
          this.router.navigate(['guarantee-types']);
        },
        e => {
          this.toastr.error("エラーが発生しました。", "Error");
        }
      )
  }
}
