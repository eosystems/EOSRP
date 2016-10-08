class Api::GuaranteeTypesController < Api::ApiController
  before_action :set_guarantee_type, only: [:show, :edit, :update, :destroy]

  def index
    @page = params[:page] || 1
    @per = params[:per] || 100
    @guarantee_types = GuaranteeType
      .search_with(params[:filter], params[:sort], @page, @per)
    ng2_search_table_response(@guarantee_types)
  end

  def show
    render json: @guarantee_type
  end

  def create
    @guarantee_type = GuaranteeType.new(guarantee_type_params)

    if @guarantee_type.save
      # 保証タイプ作成時に船保証リストを作成する
      Guarantee.create_new_guarantee(@guarantee_type.id)
      render json: { result: "success", guarantee_type: @guarantee_type }
    else
      render json: { result: "error", message: @guarantee_type.errors.messages }, status: 422
    end
  end

  def update
    if @guarantee_type.update_attributes(guarantee_type_params)
      render json: {result: "success", guarantee_type: @guarantee_type}
    else
      render json: { result: "error", message: @guarantee_type.errors.messages }, status: 422
    end
  end

  def destroy
    if @guarantee_type.destroy
      render json: {result: "success"}
    else
      render json: { result: "error", message: @guarantee_type.errors.messages }, status: 422
    end
  end

  private

  def set_guarantee_type
    @guarantee_type = GuaranteeType.find(params[:id])
  end

  def guarantee_type_params
    json_body[:guarantee_type]
      .slice(:name, :description)
  end
end
