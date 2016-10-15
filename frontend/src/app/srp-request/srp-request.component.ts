import {Component, ViewChild} from '@angular/core';
import {TextFilterComponent} from 'ng2-search-table/components/table-filter/text-filter.component';
import {SortableHeaderComponent} from 'ng2-search-table/components/header/sortable-header.component';
import {SimpleHeaderComponent} from 'ng2-search-table/components/header/simple-header.component';
import {SearchTableComponent} from 'ng2-search-table/components/search-table.component';

@Component({
  selector: 'guarantee-type',
  templateUrl: './guarantee-type.template.html'
})

export class SrpRequestComponent {
  searchTableConfig: any = {
    url: process.env.API_URL + '/api/guarantee_types',
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
      name: 'name',
      model: { displayName: 'Name' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'description',
      model: { displayName: 'Description' },
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
}
