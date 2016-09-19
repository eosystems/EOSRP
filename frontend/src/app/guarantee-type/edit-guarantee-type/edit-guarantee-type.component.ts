import {Component} from '@angular/core';
import {GuaranteeTypeForm} from '../../models/guarantee-type-form';
import {GuaranteeTypeService} from '../guarantee-type.service';
import {ToastsManager} from 'ng2-toastr';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'edit-guarantee-type',
  templateUrl: './edit-guarantee-type.template.html'
})

export class EditGuaranteeType {
  formId: string;
  guaranteeTypeForm: GuaranteeTypeForm;
  submitLocked: boolean = false;

  constructor(
    private guaranteeTypeService: GuaranteeTypeService,
    private toastr: ToastsManager,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(p => this.formId = p['id']);
  }

  ngOnInit() {
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
        .create(this.guaranteeTypeForm)
        .subscribe(
          r => {
            this.toastr.success("保存に成功しました。", "Success");
            this.router.navigate(['guarantee-types']);
          },
          e => {
            this.toastr.error("エラーが発生しました。", "Error");
            this.submitLocked = false;
          }
        );
    }
  }
}
