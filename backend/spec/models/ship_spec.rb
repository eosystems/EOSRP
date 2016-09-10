# == Schema Information
#
# Table name: ships
#
#  id        :integer          not null, primary key
#  ship_type :string(255)      not null
#  ship_name :string(255)      not null
#

require 'rails_helper'

RSpec.describe Ship, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
