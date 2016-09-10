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

create_table :guarantee_types, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.varchar :name
  t.varchar :description
  t.datetime :created_at
  t.datetime :updated_at
end

## Master ##
create_table :ships, collate: "utf8_bin" do |t|
  t.int :id, primary_key: true, extra: :auto_increment
  t.varchar :ship_type
  t.varchar :ship_name
end


