class Api::GuaranteesController < Api::ApiController
  before_action :role_check, only: [:update_all]

  def index
    @page = params[:page] || 1
    @per = params[:per] || 100
    @guarantees = Guarantee
      .preload(:ship)
      .where(guarantee_type_id: params[:id])
      .search_with(params[:filter], params[:sort] ,@page, @per)
  end

  def guarantee_price_by_ship_and_guarantee_type
    ship_id = params[:ship_id]
    guarantee_type_id = params[:guarantee_type_id]

    @guarantee = Guarantee.where(ship_id: ship_id, guarantee_type_id: guarantee_type_id).first
  end

  def default_srp
    ship_id = params[:ship_id]
    srp_destination_id = params[:srp_destination_id]

    dest = SrpDestination.find(srp_destination_id)
    if !dest.nil?
      guarantee_type_id = dest.default_guarantee_type_id
    end

    @guarantee = Guarantee.where(ship_id: ship_id, guarantee_type_id: guarantee_type_id).first
  end

  def update_all
    guarantees = Guarantee.where(id: posted_guarantees.map { |v| v[:id] })
    guarantees.each do |target|
      guarantee = posted_guarantees.find { |v| v[:id] == target.id }
      target.attributes = guarantee
    end

    if guarantees.each(&:valid?).all?(&:valid?)
      Guarantee.transaction do
        guarantees.each(&:save!)
      end
      render json: { message: "Success" }
    else
      # TODO: 詳細なエラーを返す
      render json: { error: "Error" }, status: 422
    end
  end

  private

  def posted_guarantees
    permitted_attributes = %i(id price description)
    @_guarantees ||= json_body[:guarantees].map { |v| v.slice(*permitted_attributes) }
  end

  def role_check
    if current_user.has_admin_role? == false
      render json: { result: "error", message: "権限がありません"}, status: 401
    end
  end

end
