create_table :users, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.varchar :uid
  t.varchar :provider, null: false, default: "eve_online"
  t.varchar :encrypted_password, null: false, default: ""

  ## Recoverable
  t.varchar   :reset_password_token, null: true, default: ""
  t.datetime :reset_password_sent_at, null: true

  ## Rememberable
  t.datetime :remember_created_at, null: true

  ## Trackable
  t.int  :sign_in_count, default: 0, null: false
  t.datetime :current_sign_in_at, null: true
  t.datetime :last_sign_in_at, null: true
  t.varchar   :current_sign_in_ip, default: ""
  t.varchar   :last_sign_in_ip, default:""

  # Confirmable
  t.varchar   :confirmation_token, null: true
  t.datetime :confirmed_at, null: true
  t.datetime :confirmation_sent_at, null: true
  t.varchar   :unconfirmed_email,null: true # Only if using reconfirmable

  ## User Info
  t.varchar :name, null: true
  t.varchar :nickname, null: true
  t.varchar :image, null: true
  t.varchar :email, null: true

  ## Tokens
  t.text :tokens

  t.datetime :created_at
  t.datetime :updated_at
end

create_table :user_details, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.int :user_id
  t.int :corporation_id, null: true
  t.int :alliance_id, null: true
end

create_table :user_roles, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.int :user_id
  t.int :role, null: true
end

create_table :guarantee_types, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.varchar :name
  t.varchar :description, null: true
  t.datetime :created_at
  t.datetime :updated_at
end

create_table :guarantees, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.int :ship_id
  t.int :guarantee_type_id
  t.decimal :price, precision: 20, scale: 4, comment: "保証額", default: '0.000'
  t.varchar :description, null: true
  t.datetime :created_at
  t.datetime :updated_at
end

create_table :srp_destinations, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.int :name
  t.varchar :description, null: true
  t.int :corporation_id, null: true
  t.int :alliance_id, null: true
  t.varchar :external, null: true
  t.datetime :created_at
  t.datetime :updated_at
end

create_table :srp_requests, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.varchar :zkill_url
  t.decimal :zkill_valuation, precision: 20, scale: 4, comment: "ZKillboard 評価額", default: '0.000'
  t.int :ship_id
  t.decimal :price, precision: 20, scale: 4, comment: "保証額", default: '0.000'
  t.varchar :request_comment, null: true
  t.varchar :manager_comment, null: true
  t.varchar :processing_status, default: "in_process", comment: "処理ステータス"
  t.int :srp_destination_id
  t.int :guarantee_type_id, null: true
  t.int :user_id
  t.int :process_user_id, null: true, comment: "処理担当者"

  t.datetime :created_at
  t.datetime :updated_at
end

create_table :temp_market_orders, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.bigint :order_id
  t.int :type_id
  t.boolean :buy, null: true
  t.datetime :issued, null: true
  t.decimal :price, null: true, precision: 20, scale: 4
  t.int :volume_entered, null: true
  t.bigint :station_id, null: true
  t.int :volume, null: true
  t.varchar :range, null: true
  t.int :min_volume, null: true
  t.int :duration, null: true
  t.datetime :created_at, null: true
  t.datetime :updated_at, null: true


  t.index [:type_id, :buy, :station_id], name: "index_type_id_and_buy_and_station_id"
end

create_table :market_orders, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.bigint :order_id
  t.int :type_id
  t.boolean :buy, null: true
  t.datetime :issued, null: true
  t.decimal :price, null: true, precision: 20, scale: 4
  t.int :volume_entered, null: true
  t.bigint :station_id, null: true
  t.int :volume, null: true
  t.varchar :range, null: true
  t.int :min_volume, null: true
  t.int :duration, null: true
  t.datetime :created_at, null: true
  t.datetime :updated_at, null: true


  t.index [:type_id, :buy, :station_id], name: "index_type_id_and_buy_and_station_id"
end

create_table :delayed_jobs, comment: 'Delayed Job' do |t|
  t.int :id, primary_key: true, extra: 'auto_increment'
  t.int :priority, default: 0, null: false
  t.int :attempts, default: 0, null: false
  t.text :handler
  t.text :last_error, null: true
  t.datetime :run_at, null: true
  t.datetime :locked_at, null: true
  t.datetime :failed_at, null: true
  t.varchar :locked_by, null: true
  t.varchar :queue, null: true

  t.datetime :created_at, null: true, comment: '作成日時'
  t.datetime :updated_at, null: true, comment: '更新日時'

  t.index [:priority, :run_at], name: 'delayed_jobs_priority'
end

create_table :corporations, collate: "utf8_bin" do |t|
  t.int :corporation_id, primary_key: true
  t.varchar :corporation_name
  t.int :alliance_id, null: true
  t.datetime :created_at
  t.datetime :updated_at
end

create_table :alliances, collate: "utf8_bin" do |t|
  t.int :alliance_id, primary_key: true
  t.varchar :alliance_name
  t.datetime :created_at
  t.datetime :updated_at
end


## Master ##
create_table :ships, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.varchar :ship_type
  t.varchar :ship_name
end

create_table :sta_stations, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.bigint :station_id
  t.int :region_id
  t.int :solar_system_id
  t.varchar :station_name

  t.index ["station_id"], name: "index_station_id"
  t.index ["solar_system_id"], name: "index_solar_system_id"
end
