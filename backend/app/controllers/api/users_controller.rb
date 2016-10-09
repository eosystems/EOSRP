class Api::UsersController < Api::ApiController
  def me
    # TODO: ここでユーザの権限情報を返す
    auth_type = "admin"

    render json: {
      sign_in: true,
      id: current_user.id,
      uid: current_user.uid,
      name: current_user.name,
      nickname: current_user.nickname,
      auth_type: auth_type
    }
  end
end
