require 'zkill_client.rb'
class Api::ZkillsController < Api::ApiController

  def index
    url = params[:zkill_url]
    client = ZkillClient.new
    @zkill = client.fetch_loss(client.get_kill_id_from_url(url))
    @zkill_old = {}
    @zkill_old["victim"] = { characterID: @zkill.victim.character_id, characterName: 'Not Support sorry..'}
  end
end
