json.page 1
json.per 1
json.totalCount 1

json.results do
  json.characterID @zkill.victim.character_id
  json.characterName 'Not support'
  json.shipTypeID @zkill.victim.ship_type_id
  json.(@zkill.zkb, :totalValue)
  json.shipName Ship.find(@zkill.victim.ship_type_id).ship_name
  json.killTime @zkill.killmail_time
end
