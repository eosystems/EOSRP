class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::Serialization

  def ng2_search_table_response(records, page: 1, per: 20)
    render json: {
      page: @page,
      per: @per,
      totalCount: records.total_count,
      results: records
    }
  end

  def body
    @_body ||= request.body.read
  end

  def json_body
    @_json_body ||= JSON.parse(body).with_indifferent_access
  end

  def get_token(access_token)
    #create access token
    client = OAuth2::Client.new(Settings.applications.app_id, Settings.applications.app_secret)
    OAuth2::AccessToken.new(client, access_token)
  end


end
