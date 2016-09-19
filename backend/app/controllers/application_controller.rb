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
end
