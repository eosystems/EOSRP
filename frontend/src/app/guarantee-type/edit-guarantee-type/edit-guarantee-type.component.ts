import {Component, ViewChild} from '@angular/core';
import {GuaranteeTypeForm} from '../../models/guarantee-type-form';
import {GuaranteeTypeService} from '../guarantee-type.service';
import {ToastsManager} from 'ng2-toastr';
import {ActivatedRoute} from '@angular/router';
import {SimpleForm} from '../../common/simple-form/simple-form.component';

@Component({
  selector: 'edit-guarantee-type',
  templateUrl: './edit-guarantee-type.template.html'
})

export class EditGuaranteeType {
  formId: string;
  guaranteeTypeForm: GuaranteeTypeForm;
  submitLocked: boolean = false;

  @ViewChild('form') form: SimpleForm;

  constructor(
    private guaranteeTypeService: GuaranteeTypeService,
    private toastr: ToastsManager,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(p => this.formId = p['id']);
  }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this
      .guaranteeTypeService
      .get(this.formId)
      .subscribe(
        r => {
          this.guaranteeTypeForm = r;
        },
        e => {
          this.toastr.error("データが取得できませんでした。", "Error");
        }
      );
  }

  formSubmit() {
    if (!this.submitLocked) {
      this.submitLocked = true;
      this.toastr.info("保存しています。", "Post");

      this
        .guaranteeTypeService
        .update(this.formId, this.guaranteeTypeForm)
        .subscribe(
          _ => {
            this.toastr.success("更新に成功しました。", "Success");
            this.form.markAsPristine();
          },
          _ => {
            this.toastr.error("エラーが発生しました。", "Error");
            this.submitLocked = false;
          },
          _ => {
            this.submitLocked = false;
          }
        );
    }
  }
}
