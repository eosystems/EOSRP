import {Component} from '@angular/core';
import {GuaranteeTypeForm} from '../../models/guarantee-type-form';
import {GuaranteeTypeService} from '../guarantee-type.service';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'new-guarantee-type',
  templateUrl: './new-guarantee-type.template.html'
})

export class NewGuaranteeTypeComponent {
  guaranteeTypeForm: GuaranteeTypeForm;
  submitLocked: boolean = false;

  constructor(
    private guaranteeTypeService: GuaranteeTypeService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    this.guaranteeTypeForm = new GuaranteeTypeForm();
  }

  formSubmit() {
    if (!this.submitLocked) {
      this.submitLocked = true;
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
            if (e.status == 401){
              this.toastr.error("権限がありません", "Error");
            }
            else{
              this.toastr.error("エラーが発生しました", "Error");
            }
            this.submitLocked = false;
          }
        );
    }
  }
}
