class Api::ShipTypesController < Api::ApiController
  def index
    @ship_types = Ship.select(:ship_type).uniq
    render json: @ship_types
  end
end
