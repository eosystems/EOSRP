require "csv"

CSV.foreach('db/ships.csv') do |row|
  Ship.create(:id => row[0], :ship_type => row[1], :ship_name => row[2])
end
