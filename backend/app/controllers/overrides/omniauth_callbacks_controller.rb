module Overrides
  class OmniauthCallbacksController < DeviseTokenAuth::OmniauthCallbacksController

    def omniauth_success
      super
      uid = auth_hash['uid']

      # ユーザー詳細情報をEve Onlineより取得
      character = Character.initialized_by(get_token(auth_hash['credentials']['token']), uid)

      # ユーザー情報更新
      user = User.find_by_uid(uid)
      user.attributes = {
        name: auth_hash['info'].character_name
      }
      user.save!

      # Alliance情報 初回
      if Alliance.find_by_alliance_id(character.alliance_id).nil? && character.alliance_id.present?
        alliance = Alliance.new
        alliance.alliance_id = character.alliance_id
        alliance.alliance_name = character.alliance_name
        alliance.save!
      end

      # corp情報 初回
      if Corporation.find_by_corporation_id(character.corporation_id).nil? && character.corporation_id.present?
        corp = Corporation.new
        corp.corporation_id = character.corporation_id
        corp.corporation_name = character.corporation_name
        corp.save!
      elsif character.corporation_id.present?
        corp = Corporation.find(character.corporation_id)
        corp.attributes = {
          alliance_id: character.alliance_id
        }
        corp.save!
      end

      # ユーザー詳細情報更新
      user_detail = UserDetail.find_or_initialize_by(user_id: uid)
      user_detail.attributes = {
        user_id: uid,
        corporation_id: character.corporation_id,
        alliance_id: character.alliance_id
      }
      user_detail.save!

    end
  end
end
