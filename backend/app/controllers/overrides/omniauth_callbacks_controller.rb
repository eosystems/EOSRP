module Overrides
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

    def omniauth_success
      binding.pry
      uid = auth_hash['uid']

      # ユーザー詳細情報をEve Onlineより取得
      character = Character.initialized_by(get_token(auth_hash['credentials']['token']), uid)

      # ユーザー情報更新
      user = User.find_by_uid(uid)
      user.attributes = {
        name: auth_hash['info'].character_name
      }
      user.save!

      # corp情報 初回
      if Corporation.find_by_corporation_id(character.corporation_id).nil? && character.corporation_id.present?
        corp = Corporation.new
        corp.corporation_id = character.corporation_id
        corp.corporation_name = character.corporation_name
        corp.save!
      elsif character.corporation_id.present?
        corp = Corporation.find(character.corporation_id)

      end

      # ユーザー詳細情報更新
      user_detail = UserDetail.find_or_initialize_by(user_id: User.find_by_uid(uid))
      user_detail.attributes = {
        user_id: uid,
        corporation_id: character.corporation_id,
        alliance_id: character.alliance_id
      }
      user_detail.save!

      super
    end
  end
end
