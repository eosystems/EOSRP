json.page @page
json.per @per
json.totalCount @srp_approvals.total_count

json.results do
  json.array! @srp_approvals do |srp_approval|
    json.(srp_approval,
          :id, :zkill_url, :zkill_valuation, :ship, :price,
          :request_comment, :manager_comment,
          :srp_destination, :guarantee_type, :user,
          :created_at, :updated_at)
    json.processing_status srp_approval.processing_status
  end
end
