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

class Guarantee < ActiveRecord::Base
  include Ng2SearchTableSearchable

  # Constants
  RANSACK_FILTER_ATTRIBUTES = {
    id: :id_eq,
    ship_id: :ship_id_eq,
    description: :description_cont,
    guarantee_ship_type: :ship_ship_type_cont_any,
    guarantee_ship_name: :ship_ship_name_cont_any
  }.with_indifferent_access.freeze

  RANSACK_SORT_ATTRIBUTES = {
    id: :id,
    ship_id: :ship_id,
    price: :price,
    guarantee_ship_type: :ship_ship_type,
    guarantee_ship_name: :ship_ship_name,
    created_at: :created_at,
    updated_at: :updated_at,
  }.with_indifferent_access.freeze

  # Relations
  belongs_to :ship
  belongs_to :guarantee_type

  # Delegate
  delegate :ship_type, to: :ship, allow_nil: true, prefix: :guarantee
  delegate :ship_name, to: :ship, allow_nil: true, prefix: :guarantee
  delegate :jita_sell_min_price, to: :ship, allow_nil: true, prefix: :guarantee

  # Methods
  def self.create_new_guarantee(guarantee_type_id)
    ships = Ship.all
    ships.each do |ship|
      g = Guarantee.new(ship_id: ship.id, guarantee_type_id: guarantee_type_id)
      g.save!
    end
  end
end
