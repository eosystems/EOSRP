class Api::GuaranteesController < ApplicationController
  def index
    @page = params[:page] || 1
    @per = params[:per] || 100
    @guarantees = Guarantee
      .preload(:ship)
      .where(guarantee_type_id: params[:id])
      .search_with(params[:filter], params[:sort] ,@page, @per)
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
end
