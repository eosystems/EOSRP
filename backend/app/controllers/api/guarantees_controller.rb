class Api::GuaranteesController < ApplicationController
  def index
    @guarantees = GuaranteeType.where(guarantee_type_id: params[:id])
    render json: @guarantees
  end

  def update_all
    binding.pry
    params[:guarantees].each do |params_guarantee|
      model_guarantee = Guarantee.where(id: params_guarantee[:id]).first
      model_guarantee.update_attributes!(params_guarantee)
    end

    render json: {result: "success", guarantee_type: @guarantee_type}
  end

  private

  #def params_guarantee
  #  params
  #    .require(:guarantee)
  #    .permit(:price, :description)
  #end

end
