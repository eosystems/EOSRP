# == Schema Information
#
# Table name: ships
#
#  id        :integer          not null, primary key
#  ship_type :string(255)      not null
#  ship_name :string(255)      not null
#

FactoryGirl.define do
  factory :ship do
    ShipType ""
    ShipName ""
  end
end
