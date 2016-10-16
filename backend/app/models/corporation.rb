# == Schema Information
#
# Table name: corporations
#
#  corporation_id   :integer          not null, primary key
#  corporation_name :string(255)      not null
#  alliance_id      :integer
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Corporation < ActiveRecord::Base
  belongs_to :alliance
  has_many :user_details
end
