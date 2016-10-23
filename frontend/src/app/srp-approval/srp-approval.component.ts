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
import {Guarantee} from '../models/guarantee';
import {GuaranteeService} from '../guarantee/guarantee.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'srp-approval',
  templateUrl: './srp-approval.template.html'
})

export class SrpApprovalComponent {
  @ViewChild('searchTable') searchTable: any
  srpApprovalForm: SrpApprovalForm;
  guarantee: Guarantee;
  guaranteeTypes: Array<GuaranteeType>;
  guaranteeTypeDescription: string;

  constructor(
    private srpApprovalService: SrpApprovalService,
    private guaranteeTypeService: GuaranteeTypeService,
    private guaranteeService: GuaranteeService,
    private toastr: ToastsManager
  ) {
    this.srpApprovalForm = new SrpApprovalForm();
    this.guarantee = new Guarantee();
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
      name: 'user_name',
      model: { displayName: 'User' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'ship_ship_name',
      model: { displayName: 'ShipName' },
      headerComponent: SortableHeaderComponent,
      filterComponent: TextFilterComponent
    },
    {
      name: 'price',
      model: { displayName: '承認額' },
      headerComponent: SimpleHeaderComponent
    },
    {
      name: 'created_at',
      model: { displayName: '申請日' },
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

  // 標準額設定
  loadDefaultPrice(){
    this.guaranteeService
    .get_default_price(this.srpApprovalForm.ship.id, this.srpApprovalForm.guaranteeTypeId)
    .subscribe(
      r => {
        this.srpApprovalForm.price = r.price;
        this.toastr.success("標準額を設定しました", "Success");
      },
      error => {
        this.toastr.error("標準額設定に失敗しました", "Error");
      }
    );
  }

  // 申請先標準設定
  loadDefault(){
    this.guaranteeService
    .get_default_setting(this.srpApprovalForm.ship.id, this.srpApprovalForm.srpDestinationId)
    .subscribe(
      r => {
        this.srpApprovalForm.price = r.price;
        this.srpApprovalForm.guaranteeTypeId = r.guaranteeTypeId;
        this.guaranteeTypeDescription = this.guaranteeTypes.filter(v => v.id == this.srpApprovalForm.guaranteeTypeId)[0].description;
        this.toastr.success("申請先標準設定をしました", "Success");
      },
      error => {
        this.toastr.error("申請先標準設定に失敗しました", "Error");
      }
    );
  }


  clickApprove() {
    this.toastr.info("承認しています。", "Post");
    this.srpApprovalForm.processingStatus = "done";

    this.srpApprovalService
      .update(this.srpApprovalForm)
      .subscribe(
        r => {
          this.toastr.success("承認しました。", "Success");
          this.reloadSearchTable();
        },
        e => {
          this.toastr.error("エラーが発生しました。", "Error");
        }
      );
  }

  clickBack() {
    this.toastr.info("ステータスを戻しています。", "Post");
    this.srpApprovalForm.processingStatus = "in_process";

    this.srpApprovalService
      .update(this.srpApprovalForm)
      .subscribe(
        r => {
          this.toastr.success("ステータスを戻しました。", "Success");
          this.reloadSearchTable();
        },
        e => {
          this.toastr.error("エラーが発生しました。", "Error");
        }
      );
  }

  clickReject() {
    this.toastr.info("却下しています。", "Post");
    this.srpApprovalForm.processingStatus = "reject";

    this.srpApprovalService
      .update(this.srpApprovalForm)
      .subscribe(
        r => {
          this.toastr.success("却下しました。", "Success");
          this.reloadSearchTable();
        },
        e => {
          this.toastr.error("エラーが発生しました。", "Error");
        }
      );
  }

}
