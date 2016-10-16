import {Component, ViewChild} from '@angular/core';
import {TextFilterComponent} from 'ng2-search-table/components/table-filter/text-filter.component';
import {SortableHeaderComponent} from 'ng2-search-table/components/header/sortable-header.component';
import {SimpleHeaderComponent} from 'ng2-search-table/components/header/simple-header.component';
import {SearchTableComponent} from 'ng2-search-table/components/search-table.component';
import {SrpRequestForm} from '../models/srp-request-form';
import {SrpRequestService} from './srp-request.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'srp-request',
  templateUrl: './srp-request.template.html'
})

export class SrpRequestComponent {
  srpRequestForm: SrpRequestForm;

  constructor(
    private srpRequestService: SrpRequestService,
    private toastr: ToastsManager
  ) {
    this.srpRequestForm = new SrpRequestForm();
  }

  searchTableConfig: any = {
    url: process.env.API_URL + '/api/srp_requests',
    defaultPagePer: 20
  };

  headerComponents: any = [
    {
      name: 'id',
      model: { displayName: 'Id' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'processing_status',
      model: { displayName: 'Status' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'ship_name',
      model: { displayName: 'ShipName' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'zkill_valuation',
      model: { displayName: '評価額' },
      headerComponent: SimpleHeaderComponent
    },
    {
      name: 'created_at',
      model: { displayName: 'CreatedAt' },
      headerComponent: SortableHeaderComponent
    },
    {
      name: 'updated_at',
      model: { displayName: 'UpdatedAt' },
      headerComponent: SortableHeaderComponent
    }
  ]

  reloadSearchTable(searchTable: any): void {
    searchTable.search();
  }

  // Order Grid押下時
  selectRow(id: any, searchTable: any): void{
    var results = searchTable;
    for (let v of results.dataRows){
      v.selected = false;
      if (v.id == id){
        v.selected = !v.selected;
      }
    };
    this.loadDetail(id);
  }

  // 詳細選択時
  loadDetail(id){
    this.srpRequestService
    .get(id)
    .subscribe(
      r => {
        this.srpRequestForm = r;
      },
      error => {
        this.toastr.error("情報取得に失敗しました", "Error");
      }
    );
  }

}
