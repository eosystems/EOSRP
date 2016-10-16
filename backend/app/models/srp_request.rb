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
#  guarantee_type_id  :integer
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
  belongs_to :user, primary_key: "uid"
  belongs_to :user_detail, foreign_key: 'user_id', primary_key: 'user_id'
  belongs_to :process_user, class_name: 'User', foreign_key: :process_user_id
  belongs_to :ship, class_name: 'Ship', foreign_key: :ship_id
  # Validations

  # Hooks

  # Scopes
  # 自分の申請のみ参照可能
  scope :accessible_srp_requests, -> (user_id) do
    uid = arel_table[:user_id]
    where(uid.eq(user_id))
  end

  # 指定したCorpに属している場合参照可能
  scope :accessible_srp_approvals, -> (corporation_id) do
    cid = arel_table[:corporation_id]
    where(cid.eq(corporation_id))
  end

  # Methods


end
