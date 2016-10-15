import {Component} from '@angular/core';
import {SrpRequestForm} from '../../models/srp-request-form';
import {SrpRequestService} from '../srp-request.service';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'new-srp-request',
  templateUrl: './new-srp-request.template.html'
})

export class NewSrpRequestComponent {
  srpRequestForm: SrpRequestForm;
  submitLocked: boolean = false;

  constructor(
    private srpRequestService: SrpRequestService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    this.srpRequestForm = new SrpRequestForm();
  }

  formSubmit() {
    if (!this.submitLocked) {
      this.submitLocked = true;
      this.toastr.info("保存しています。", "Post");

      this
        .srpRequestService
        .create(this.srpRequestForm)
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
