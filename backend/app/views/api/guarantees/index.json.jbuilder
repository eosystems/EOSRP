json.page @page
json.per @per
json.totalCount @guarantees.total_count

json.results do
  json.array! @guarantees do |guarantee|
    json.(guarantee,
          :id, :ship_id, :guarantee_ship_name, :guarantee_ship_type,
          :guarantee_jita_sell_min_price,
          :guarantee_type_id, :price, :description, :created_at, :updated_at)
  end
end
