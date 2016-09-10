class Api::GuaranteeTypesController < ApplicationController
  before_action :set_guarantee_type, only: [:show, :edit, :update, :destroy]
  def index
    @guarantee_types = GuaranteeType.all
    render json: @guarantee_types
  end

  def show
    render json: @guarantee_type
  end

  def create
    @guarantee_type = GuaranteeType.new(guarantee_type_params)

    if @guarantee_type.save
      render json: {result: "success", guarantee_type: @guarantee_type}
    else
      render json: {result: "error", message: @guarantee_type.errors.messages}
    end
  end

  def update
    if @guarantee_type.update_attributes(guarantee_type_params)
      render json: {result: "success", guarantee_type: @guarantee_type}
    else
      render json: {result: "error", message: @guarantee_type.errors.messages}
    end
  end

  def destroy
    if @guarantee_type.destroy
      render json: {result: "success"}
    else
      render json: {result: "error", message: @guarantee_type.errors.messages}
    end
  end

  private

  def set_guarantee_type
    @guarantee_type = GuaranteeType.find(params[:id])
  end

  def guarantee_type_params
    params
      .require(:guarantee_type)
      .permit(:name, :description)
  end
end
