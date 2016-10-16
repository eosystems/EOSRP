class Api::SrpApprovalsController < Api::ApiController
  before_action :set_srp_approval, only: [:show, :update]
  before_action :role_check, only: [:create, :update]

  def index
    @page = params[:page] || 1
    @per = params[:per] || 20
    # TODO 参照範囲はいずれ拡張
    @srp_approvals = SrpRequest
      .accessible_srp_approvals(current_user.user_detail.corporation.corporation_id)
      .search_with(params[:filter], params[:sort] ,@page, @per)
  end

  def show
    render json: @srp_approval
  end

  def update
    if @srp_approval.update_attributes(srp_approval_params)
      render json: {result: "success", srp_approval: @srp_approval}
    else
      render json: { result: "error", message: @srp_approval.errors.messages }, status: 422
    end
  end

  private

  def set_srp_approval
    @srp_approval = SrpRequest.find(params[:id])
  end

  def srp_approval_params
    json_body[:srp_approval]
      .slice(:manager_comment, :processing_status, :guarantee_type_id)
  end

  def role_check
    if !current_user.has_manager_role && !current_user.has_admin_role?
      render json: { result: "error", message: "権限がありません"}, status: 401
    end
  end

end
