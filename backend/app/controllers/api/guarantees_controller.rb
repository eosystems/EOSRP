class Api::GuaranteesController < ApplicationController
  def index
    @guarantees = GuaranteeType.where(guarantee_type_id: params[:id])
    render json: @guarantees
  end

  def update_all
    params[:guarantees].each do |params_guarantee|
      model_guarantee = Guarantee.where(id: params_guarantee[:id]).first
      model_guarantee.update_attributes!(permit_params(params_guarantee))
    end

    render json: {result: "success"}
  end

  private

  def permit_params(p)
    p.permit(:price, :description)
  end

end
