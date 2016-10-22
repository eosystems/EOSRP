json.(@srp_approval,
      :id, :zkill_url, :zkill_valuation, :ship, :price,
      :request_comment, :manager_comment,
      :srp_destination, :guarantee_type, :user,:srp_destination_id, :guarantee_type_id,
      :created_at, :updated_at)
json.processing_status @srp_approval.processing_status
