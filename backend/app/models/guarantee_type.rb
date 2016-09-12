# == Schema Information
#
# Table name: guarantee_types
#
#  id          :integer          not null, primary key
#  name        :string(255)      not null
#  description :string(255)
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class GuaranteeType < ApplicationRecord
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

  # Validations

  # Hooks

  # Scopes

  # Methods
end
