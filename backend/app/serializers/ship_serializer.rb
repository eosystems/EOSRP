# == Schema Information
#
# Table name: guarantees
#
#  id                :integer          not null, primary key
#  ship_id           :integer          not null
#  guarantee_type_id :integer          not null
#  price             :decimal(10, )    default(0), not null
#  description       :string(255)
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

class ShipSerializer < ActiveModel::Serializer
  attributes(*Ship.attribute_names.map(&:to_sym))

  attribute :jita_sell_min_price

  def jita_sell_min_price
    MarketOrder.jita_min_sell_price(object.id)
  end
end
