json.page @page
json.per @per
json.totalCount @destinations.total_count

json.results do
  json.array! @destinations do |destination|
    json.(destination,
          :id, :name, :corporation_id, :alliance_id, :external,
          :description, :created_at, :updated_at)
  end
end
