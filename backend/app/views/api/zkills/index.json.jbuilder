json.page 1
json.per 1
json.totalCount 1

json.results do
  json.(@zkill.victim, :characterID, :characterName, :shipTypeID)
  json.(@zkill.zkb, :totalValue)
  json.shipName Ship.find(@zkill.victim.shipTypeID).ship_name
  json.killTime @zkill.killTime
end
