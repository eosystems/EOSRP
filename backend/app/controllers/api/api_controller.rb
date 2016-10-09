class Api::ApiController < ApplicationController
  before_action :authenticate_user! unless Settings.applications.test_mode
  alias_method :devise_current_user, :current_user

  # APIテスト用
  def current_user
    if Settings.applications.test_mode
      test_user = params[:test_user]
      if test_user.nil?
        User.first
      else
        User.find(test_user)
      end
    else
      devise_current_user
    end
  end

end
