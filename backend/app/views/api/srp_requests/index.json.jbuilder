json.page @page
json.per @per
json.totalCount @srp_requests.total_count

json.results do
  json.array! @srp_requests do |srp_request|
    json.(srp_request,
          :id, :zkill_url, :zkill_valuation, :ship, :price,
          :request_comment, :manager_comment,
          :srp_destination, :guarantee_type, :user,
          :created_at, :updated_at)
    json.processing_status srp_request.processing_status
  end
end
