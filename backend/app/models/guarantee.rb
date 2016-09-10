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

class Guarantee < ApplicationRecord
  belongs_to :ship
  belongs_to :guarantee_type

  def self.create_new_guarantee(guarantee_type_id)
    ships = Ship.all
    ships.each do |ship|
      g = Guarantee.new(ship_id: ship.id, guarantee_type_id: guarantee_type_id)
      g.save!
    end
  end
end
