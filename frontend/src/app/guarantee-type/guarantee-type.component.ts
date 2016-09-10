import { Component } from '@angular/core';
import {TextFilterComponent} from 'ng2-search-table/components/table-filter/text-filter.component';
import {SortableHeaderComponent} from 'ng2-search-table/components/header/sortable-header.component';

@Component({
  selector: 'guarantee-type',
  templateUrl: './guarantee-type.template.html'
})

export class GuaranteeType {
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
    }
  ]
}
