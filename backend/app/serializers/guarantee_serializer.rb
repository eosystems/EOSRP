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

class GuaranteeSerializer < ActiveModel::Serializer
  attributes(*Guarantee.attribute_names.map(&:to_sym))

  belongs_to :ship
  belongs_to :guarantee_type

end
