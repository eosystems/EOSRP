require 'zkill_client.rb'
class Api::ZkillsController < Api::ApiController

  def index
    url = params[:zkill_url]
    client = ZkillClient.new
    @zkill = client.fetch_loss(client.get_kill_id_from_url(url))
  end
end
