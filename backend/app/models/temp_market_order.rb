# == Schema Information
#
# Table name: temp_market_orders
#
#  id             :integer          not null, primary key
#  order_id       :integer          not null
#  type_id        :integer          not null
#  buy            :boolean
#  issued         :datetime
#  price          :decimal(20, 4)
#  volume_entered :integer
#  station_id     :integer
#  volume         :integer
#  range          :string(255)
#  min_volume     :integer
#  duration       :integer
#  created_at     :datetime
#  updated_at     :datetime
#

class TempMarketOrder < ActiveRecord::Base
  THE_FORGE_REGION_ID = "10000002".freeze # The Forge
  JITA_SOLAR_SYSTEM_ID = "30000142".freeze # JITA
end
