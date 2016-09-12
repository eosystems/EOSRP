class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def ng2_search_table_response(records, page: 1, per: 20)
    {
      page: page,
      per: per,
      totalCount: records.total_count,
      results: records
    }
  end
end
