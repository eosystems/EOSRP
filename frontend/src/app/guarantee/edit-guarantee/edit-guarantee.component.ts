import {Component, Input} from '@angular/core';
import {Guarantee} from '../../models/guarantee';
import {GuaranteeSharedService} from '../guarantee-shared.service';

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

  constructor(private guaranteeSharedService: GuaranteeSharedService) {
    this.dataRows = this.guaranteeSharedService.getGuarantees();
  }

  onEditRecord(event: any) {
    console.log(event);
  }
}
