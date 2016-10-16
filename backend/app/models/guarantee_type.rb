# == Schema Information
#
# Table name: guarantee_types
#
#  id             :integer          not null, primary key
#  name           :string(255)      not null
#  description    :string(255)
#  corporation_id :integer          not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class GuaranteeType < ApplicationRecord
  include Ng2SearchTableSearchable

  belongs_to :corporation

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
  has_many :guarantees, dependent: :destroy

  # Validations
  validates :name, presence: true, length: { maximum: 255 }
  validates :description, length: { maximum: 255 }

  # Hooks

  # Scopes

  # 指定したCorpに属している場合参照可能
  scope :accessible_guarantee_types, -> (corporation_id) do
    cid = arel_table[:corporation_id]
    where(cid.eq(corporation_id))
  end


  # Methods
end
