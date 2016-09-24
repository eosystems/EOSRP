# == Schema Information
#
# Table name: ships
#
#  id        :integer          not null, primary key
#  ship_type :string(255)      not null
#  ship_name :string(255)      not null
#

class ShipSerializer < ActiveModel::Serializer
  attributes(*Ship.attribute_names.map(&:to_sym))

  attribute :jita_sell_min_price

  def jita_sell_min_price
    MarketOrder.jita_min_sell_price(object.id)
  end
end
