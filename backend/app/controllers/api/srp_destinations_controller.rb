class Api::SrpDestinationsController < Api::ApiController
  before_action :set_srp_destination, only: [:show, :edit, :update, :destroy]

  def index
    @page = params[:page] || 1
    @per = params[:per] || 10
    @destinations = SrpDestination
      .search_with(params[:filter], params[:sort] ,@page, @per)
    ng2_search_table_response(@destinations)
  end

  def show
    render json: @srp_destination
  end

  def create
    @srp_destination = SrpDestination.new(srp_destination_params)

    if @srp_destination.save
      render json: { result: "success", guarantee_type: @srp_destination }
    else
      render json: { result: "error", message: @srp_destination.errors.messages }, status: 422
    end
  end

  def update
    if @srp_destination.update_attributes(srp_destination_params)
      render json: {result: "success", guarantee_type: @srp_destination}
    else
      render json: { result: "error", message: @srp_destination.errors.messages }, status: 422
    end
  end

  def destroy
    if @srp_destination.destroy
      render json: {result: "success"}
    else
      render json: { result: "error", message: @srp_destination.errors.messages }, status: 422
    end
  end


  private

  def set_srp_destination
    @srp_destination = SrpDestination.find(params[:id])
  end

  def srp_destination_params
    json_body[:srp_destination]
      .slice(:name, :description, :corporation_id, :alliance_id, :external)
  end

end
