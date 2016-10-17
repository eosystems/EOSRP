import {Component} from '@angular/core';
import {SrpRequestForm} from '../../models/srp-request-form';
import {SrpRequestService} from '../srp-request.service';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {ZkillService} from '../../zkill/zkill.service';
import {Zkill} from '../../models/zkill';
import {SrpDestination} from '../../models/srp-destination';
import {SrpDestinationService} from '../../srp-destination/srp-destination.service'

@Component({
  selector: 'new-srp-request',
  templateUrl: './new-srp-request.template.html'
})

export class NewSrpRequestComponent {
  srpRequestForm: SrpRequestForm;
  srpDestinations: Array<SrpDestination>;
  srpDestinationDescription: string;
  zkill: Zkill;
  submitLocked: boolean = false;

  constructor(
    private srpRequestService: SrpRequestService,
    private zkillService: ZkillService,
    private toastr: ToastsManager,
    private router: Router,
    private srpDestinationService: SrpDestinationService
  ) {
    this.srpRequestForm = new SrpRequestForm();
    this.zkill = new Zkill();
  }

  ngOnInit() {
    this
      .srpDestinationService
      .all()
      .subscribe(
        r => {
          if (r) {
            this.srpDestinations = r;
            this.srpRequestForm.srpDestinationId = r[0].id;
            this.srpDestinationDescription = r[0].description;
          }
        },
        _ => {
          this.toastr.error("申請先マスタを取得できませんでした。", "Error")
        }
      )
  }

  changeSrpDestination(event: any){
      this.srpRequestForm.srpDestinationId = event.target.value;
      this.srpDestinationDescription = this.srpDestinations.filter(v => v.id == this.srpRequestForm.srpDestinationId)[0].description;
  }

  formSubmit() {
    if (!this.submitLocked) {
      this.submitLocked = true;
      this.toastr.info("保存しています。", "Post");

      this
        .srpRequestService
        .create(this.srpRequestForm, this.zkill)
        .subscribe(
          r => {
            this.toastr.success("保存に成功しました。", "Success");
            this.router.navigate(['srp-requests']);
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
