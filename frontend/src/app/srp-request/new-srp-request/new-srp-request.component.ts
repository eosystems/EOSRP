import {Component} from '@angular/core';
import {SrpRequestForm} from '../../models/srp-request-form';
import {SrpRequestService} from '../srp-request.service';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {ZkillService} from '../../zkill/zkill.service';
import {Zkill} from '../../models/zkill';

@Component({
  selector: 'new-srp-request',
  templateUrl: './new-srp-request.template.html'
})

export class NewSrpRequestComponent {
  srpRequestForm: SrpRequestForm;
  zkill: Zkill;
  submitLocked: boolean = false;

  constructor(
    private srpRequestService: SrpRequestService,
    private zkillService: ZkillService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    this.srpRequestForm = new SrpRequestForm();
    this.zkill = new Zkill();
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

  getZkillInformation() {
    if (!this.submitLocked) {
      this.submitLocked = true
      this.toastr.info("Zkill Boardより情報を取得中です", "Get");

      this.
        zkillService
        .get(this.srpRequestForm.zkillUrl)
        .subscribe(
          r => {
            this.toastr.success("情報取得に成功しました", "Success");
            this.zkill = r;
            this.submitLocked = false;
          },
          error => {
            this.toastr.error("情報取得に失敗しました URLを確認してください", "Error");
            this.submitLocked = false;
          }
        );
    }
  }

}
