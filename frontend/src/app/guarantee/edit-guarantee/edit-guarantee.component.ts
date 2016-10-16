import {Component, Input} from '@angular/core';
import {Guarantee} from '../../models/guarantee';
import {GuaranteeSharedService} from '../guarantee-shared.service';
import {GuaranteeService} from '../guarantee.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'edit-guarantee',
  templateUrl: "./edit-guarantee.template.html"
})

export class EditGuaranteeComponent {
  colHeaders: Array<string> = [
    'Id', 'ShipType', 'ShipName', 'Price', 'Description'
  ];
  columns: Array<any> = [
    {
      data: 'id',
      readOnly: true
    },
    {
      data: 'guarantee_ship_type',
      readOnly: true
    },
    {
      data: 'guarantee_ship_name',
      readOnly: true
    },
    {
      data: 'price',
      type: 'numeric',
      format: '0,0.00'
    },
    {
      data: 'description'
    },
  ];
  options: any = {
    stretchH: 'all',
    columnSorting: true
  };
  dataRows: Array<Guarantee> = new Array<Guarantee>();

  constructor(
    private guaranteeSharedService: GuaranteeSharedService,
    private guaranteeService: GuaranteeService,
    private toastr: ToastsManager
  ) {
    this.dataRows = this.guaranteeSharedService.getGuarantees();
  }

  updateAll() {
    this.toastr.info("更新を反映しています。", "Waiting");
    this
      .guaranteeService
      .bulkUpdate(this.dataRows)
      .subscribe(
        _ => {
          this.toastr.success("保存しました。", "Success");
        },
        _ => {
          // TODO: エラーをHandsontableに反映する
          if (_.status == 401){
            this.toastr.error("権限がありません", "Error");
          }
          else{
            this.toastr.error("エラーが発生しました", "Error");
          }
        }
      );
  }
}
