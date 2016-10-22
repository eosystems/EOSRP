import {Component, ViewChild} from '@angular/core';
import {TextFilterComponent} from 'ng2-search-table/components/table-filter/text-filter.component';
import {SortableHeaderComponent} from 'ng2-search-table/components/header/sortable-header.component';
import {SelectFilterComponent} from "ng2-search-table/ng2-search-table";
import {SimpleHeaderComponent} from 'ng2-search-table/components/header/simple-header.component';
import {SearchTableComponent} from 'ng2-search-table/components/search-table.component';
import {SrpApprovalForm} from '../models/srp-approval-form';
import {SrpApprovalService} from './srp-approval.service';
import {GuaranteeType} from '../models/guarantee-type';
import {GuaranteeTypeService} from '../guarantee-type/guarantee-type.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'srp-approval',
  templateUrl: './srp-approval.template.html'
})

export class SrpApprovalComponent {
  @ViewChild('searchTable') searchTable: any
  srpApprovalForm: SrpApprovalForm;
  guaranteeTypes: Array<GuaranteeType>;
  guaranteeTypeDescription: string;

  constructor(
    private srpApprovalService: SrpApprovalService,
    private guaranteeTypeService: GuaranteeTypeService,
    private toastr: ToastsManager
  ) {
    this.srpApprovalForm = new SrpApprovalForm();
    this.guaranteeTypeDescription = "";
  }

  searchTableConfig: any = {
    url: process.env.API_URL + '/api/srp_approvals',
    defaultPagePer: 20
  };

  headerComponents: any = [
    {
      name: 'id',
      model: { displayName: '#' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'processing_status',
      model: {
        displayName: "Status",
        selectValues: [
          { },
          { id: "in_process", name: "in_process" },
          { id: "done", name: "done" },
          { id: "reject", name: "reject" }
        ]
      },
      headerComponent: SortableHeaderComponent,
      filterComponent: SelectFilterComponent
    },
    {
      name: 'srp_destination',
      model: { displayName: '申請先' },
      headerComponent: SimpleHeaderComponent
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

  reloadSearchTable() {
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

  ngOnInit() {
    this
      .guaranteeTypeService
      .all()
      .subscribe(
        r => {
          if (r) {
            this.guaranteeTypes = r;
          }
        },
        _ => {
          this.toastr.error("保証タイプを取得できませんでした。", "Error")
        }
      )
  }

  changeGuaranteeType(event: any){
      this.srpApprovalForm.guaranteeTypeId = event.target.value;
      this.guaranteeTypeDescription = this.guaranteeTypes.filter(v => v.id == this.srpApprovalForm.guaranteeTypeId)[0].description;
  }


  // 詳細選択時
  loadDetail(id){
    this.srpApprovalService
    .get(id)
    .subscribe(
      r => {
        this.srpApprovalForm = r;
        // 保証種別説明
        if(this.srpApprovalForm.guaranteeTypeId != null){
          this.guaranteeTypeDescription = this.guaranteeTypes.filter(v => v.id == this.srpApprovalForm.guaranteeTypeId)[0].description;
        }else{
          this.guaranteeTypeDescription = "";
        }
      },
      error => {
        this.toastr.error("情報取得に失敗しました", "Error");
      }
    );
  }

  clickApprove() {
    this.toastr.info("保存しています。", "Post");

    this.srpApprovalService
      .update(this.srpApprovalForm)
      .subscribe(
        r => {
          this.toastr.success("保存に成功しました。", "Success");
        },
        e => {
          this.toastr.error("エラーが発生しました。", "Error");
        }
      );
  }

}
