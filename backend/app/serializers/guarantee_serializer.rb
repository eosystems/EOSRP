class GuaranteeSerializer < ActiveModel::Serializer
  attributes(*Guarantee.attribute_names.map(&:to_sym))

  belongs_to :ship
  belongs_to :guarantee_type

end
