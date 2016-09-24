import {Component, ViewChild} from '@angular/core';
import {SortableHeaderComponent} from 'ng2-search-table/components/header/sortable-header.component';
import {TextFilterComponent} from 'ng2-search-table/components/table-filter/text-filter.component';
import {SimpleHeaderComponent} from 'ng2-search-table/components/header/simple-header.component';
import {GuaranteeTypeService} from '../guarantee-type/guarantee-type.service';
import {GuaranteeType} from '../models/guarantee-type';
import {GuaranteeService} from './guarantee.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'guarantee',
  templateUrl: './guarantee.template.html'
})

export class GuaranteeComponent {
  @ViewChild('searchTable') searchTable: any;

  guaranteeTypes: Array<GuaranteeType>;
  initialGuaranteeTypeId: number;
  currentGuaranteeTypeId: number;
  searchTableConfig: any;
  isEditingMode: boolean = false;

  headerComponents: any = [
    {
      name: 'id',
      model: { displayName: 'Id' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: '#',
      model: { displayName: '#' },
      headerComponent: SimpleHeaderComponent
    },
    {
      name: 'guarantee_ship_type',
      model: { displayName: 'ShipType' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'guarantee_ship_name',
      model: { displayName: 'ShipName' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'price',
      model: { displayName: 'Price' },
      headerComponent: SortableHeaderComponent
    },
    {
      name: 'guarantee_jita_sell_min_price',
      model: { displayName: 'Jita Sell Min' },
      headerComponent: SimpleHeaderComponent
    }
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

  constructor(
    private guaranteeTypeService: GuaranteeTypeService,
    private guaranteeService: GuaranteeService,
    private toastr: ToastsManager
  ) {
  }

  ngOnInit() {
    this
      .guaranteeTypeService
      .all()
      .subscribe(
        r => {
          if (r) {
            this.guaranteeTypes = r;
            this.initialGuaranteeTypeId = r[0].id;
            this.currentGuaranteeTypeId = r[0].id;
            this.updateSearchTableConfig();
          }
        },
        _ => {
          this.toastr.error("保証種別一覧が取得できませんでした。", "Error");
        }
      )

  }

  changeGuaranteeType(event: any) {
    this.currentGuaranteeTypeId = event.target.value;
    let type = this.guaranteeTypes.filter(v => v.id == this.currentGuaranteeTypeId)[0];
    this.toastr.info("補償額設定を再読込しています。", "種別 " + type.name);
    this.reloadSearchTable();
  }

  reloadSearchTable() {
    this.updateSearchTableConfig();
    if (this.searchTable) {
      // configの伝搬に時間がかかり別URLがリロードされるため、configを明示的に指定し直す
      // ng2-search-table 側にURLを変更するメソッドを取り入れたら、以下は削除する
      this.searchTable.config = this.searchTableConfig;
      this.searchTable.search();
    }
  }

  setCurrentPage(event: any): void {
    this.searchTable.setCurrentPage(event.page);
  }

  setEditingMode(edit: boolean): void {
    this.isEditingMode = edit;
  }

  private updateSearchTableConfig() {
    this.searchTableConfig = {
      url: process.env.API_URL + '/api/guarantees?id=' + this.currentGuaranteeTypeId,
      defaultPagePer: 100
    }
  }
}
