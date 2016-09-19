require "csv"

Ship.delete_all
CSV.foreach('db/ships.csv') do |row|
  Ship.create(:id => row[0], :ship_type => row[1], :ship_name => row[2])
end

StaStation.delete_all
CSV.foreach('db/sta_stations.csv') do |row|
  StaStation.create(
    :id => row[0],
    :station_id => row[1],
    :region_id => row[2],
    :solar_system_id => row[3],
    :station_name => row[4]
  )
end
