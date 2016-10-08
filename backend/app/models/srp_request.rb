# == Schema Information
#
# Table name: srp_requests
#
#  id                 :integer          not null, primary key
#  zkill_url          :string(255)      not null
#  zkill_valuation    :decimal(20, 4)   default(0.0), not null
#  ship_id            :integer          not null
#  price              :decimal(20, 4)   default(0.0), not null
#  request_comment    :string(255)
#  manager_comment    :string(255)
#  processing_status  :string(255)      default("in_process"), not null
#  srp_destination_id :integer          not null
#  guarantee_type_id  :integer          not null
#  user_id            :integer          not null
#  process_user_id    :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#

class SrpRequest < ActiveRecord::Base
  include Ng2SearchTableSearchable

  # Constants
  RANSACK_FILTER_ATTRIBUTES = {
    id: :id_eq,
    processing_status: :processing_status_eq
  }.with_indifferent_access.freeze

  RANSACK_SORT_ATTRIBUTES = {
    id: :id,
    created_at: :created_at,
    updated_at: :updated_at
  }.with_indifferent_access.freeze

  # Relations
  belongs_to :srp_destination
  belongs_to :guarantee_type
  belongs_to :user
  belongs_to :process_user, class_name: 'User', foreign_key: :process_user_id

  # Validations

  # Hooks

  # Scopes

  # Methods


end
