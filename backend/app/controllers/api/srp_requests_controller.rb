class Api::SrpRequestsController < ApplicationController
  before_action :set_srp_request, only: [:show, :edit, :update, :destroy]

  def index
    @page = params[:page] || 1
    @per = params[:per] || 20
    @srp_requests = SrpRequest
      .search_with(params[:filter], params[:sort] ,@page, @per)
  end

  def show
    render json: @srp_request
  end

  def create
    @srp_request = SrpRequest.new(srp_request_params)
    # TODO
    @srp_request.user_id = 1
    @srp_request.processing_status = ProcessingStatus::IN_PROCESS.id

    if @srp_request.save
      render json: { result: "success", srp_request: @srp_request }
    else
      render json: { result: "error", message: @srp_request.errors.messages }, status: 422
    end
  end

  def update
    if @srp_request.update_attributes(srp_request_params)
      render json: {result: "success", srp_request: @srp_request}
    else
      render json: { result: "error", message: @srp_request.errors.messages }, status: 422
    end
  end

  def destroy
    if @srp_request.destroy
      render json: {result: "success"}
    else
      render json: { result: "error", message: @srp_request.errors.messages }, status: 422
    end
  end


  private

  def set_srp_request
    @srp_request = SrpRequest.find(params[:id])
  end

  def srp_request_params
    json_body[:srp_request]
      .slice(:zkill_url, :zkill_valuation, :ship_id, :request_comment, :srp_destination_id,
            :processing_status)
  end

end
