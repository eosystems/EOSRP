# == Schema Information
#
# Table name: alliances
#
#  alliance_id   :integer          not null, primary key
#  alliance_name :string(255)      not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Alliance < ActiveRecord::Base
  has_many :corporations
  has_many :user_details
end
