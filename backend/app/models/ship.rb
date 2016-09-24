# == Schema Information
#
# Table name: ships
#
#  id        :integer          not null, primary key
#  ship_type :string(255)      not null
#  ship_name :string(255)      not null
#

class Ship < ApplicationRecord
  def jita_sell_min_price
    MarketOrder.jita_min_sell_price(self.id)
  end
end
