# == Schema Information
#
# Table name: srp_destinations
#
#  id             :integer          not null, primary key
#  name           :integer          not null
#  description    :string(255)
#  corporation_id :integer
#  alliance_id    :integer
#  external       :string(255)
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class SrpDestination < ActiveRecord::Base
  include Ng2SearchTableSearchable

  # Constants
  RANSACK_FILTER_ATTRIBUTES = {
    id: :id_eq,
    name: :name_cont,
    description: :description_cont
  }.with_indifferent_access.freeze

  RANSACK_SORT_ATTRIBUTES = {
    id: :id,
    name: :name,
    created_at: :created_at,
    updated_at: :updated_at,
  }.with_indifferent_access.freeze

  # Relations
  belongs_to :corporation

  # Validations
  validates :name, presence: true, length: { maximum: 255 }
  validates :description, length: { maximum: 255 }

  # Hooks

  # Scopes

  # Methods


end
