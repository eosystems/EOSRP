import {Component, ViewChild} from '@angular/core';
import {TextFilterComponent} from 'ng2-search-table/components/table-filter/text-filter.component';
import {SortableHeaderComponent} from 'ng2-search-table/components/header/sortable-header.component';
import {SimpleHeaderComponent} from 'ng2-search-table/components/header/simple-header.component';
import {SearchTableComponent} from 'ng2-search-table/components/search-table.component';

@Component({
  selector: 'srp-request',
  templateUrl: './srp-request.template.html'
})

export class SrpRequestComponent {
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
    console.log(id);
  }
}
