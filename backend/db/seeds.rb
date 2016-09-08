require "csv"

CSV.foreach('db/ships.csv') do |row|
  Ship.create(:ship_type => row[0], :ship_name => row[1])
end
