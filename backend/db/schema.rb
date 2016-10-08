# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "corporations", primary_key: "corporation_id", id: :integer, force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.string   "corporation_name", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "delayed_jobs", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT", comment: "Delayed Job" do |t|
    t.integer  "priority",                 default: 0, null: false
    t.integer  "attempts",                 default: 0, null: false
    t.text     "handler",    limit: 65535,             null: false
    t.text     "last_error", limit: 65535
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at",                                        comment: "作成日時"
    t.datetime "updated_at",                                        comment: "更新日時"
    t.index ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree
  end

  create_table "guarantee_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.string   "name",        null: false
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "guarantees", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.integer  "ship_id",                                                    null: false
    t.integer  "guarantee_type_id",                                          null: false
    t.decimal  "price",             precision: 20, scale: 4, default: "0.0", null: false, comment: "保証額"
    t.string   "description"
    t.datetime "created_at",                                                 null: false
    t.datetime "updated_at",                                                 null: false
  end

  create_table "market_orders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.bigint   "order_id",                                null: false
    t.integer  "type_id",                                 null: false
    t.boolean  "buy"
    t.datetime "issued"
    t.decimal  "price",          precision: 20, scale: 4
    t.integer  "volume_entered"
    t.bigint   "station_id"
    t.integer  "volume"
    t.string   "range"
    t.integer  "min_volume"
    t.integer  "duration"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["type_id", "buy", "station_id"], name: "index_type_id_and_buy_and_station_id", using: :btree
  end

  create_table "ships", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.string "ship_type", null: false
    t.string "ship_name", null: false
  end

  create_table "srp_destination", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.integer  "destination_name", null: false
    t.string   "description"
    t.integer  "corporation_id"
    t.integer  "alliance_id"
    t.string   "external"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "sta_stations", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.bigint  "station_id",      null: false
    t.integer "region_id",       null: false
    t.integer "solar_system_id", null: false
    t.string  "station_name",    null: false
    t.index ["solar_system_id"], name: "index_solar_system_id", using: :btree
    t.index ["station_id"], name: "index_station_id", using: :btree
  end

  create_table "temp_market_orders", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.bigint   "order_id",                                null: false
    t.integer  "type_id",                                 null: false
    t.boolean  "buy"
    t.datetime "issued"
    t.decimal  "price",          precision: 20, scale: 4
    t.integer  "volume_entered"
    t.bigint   "station_id"
    t.integer  "volume"
    t.string   "range"
    t.integer  "min_volume"
    t.integer  "duration"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["type_id", "buy", "station_id"], name: "index_type_id_and_buy_and_station_id", using: :btree
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=COMPACT" do |t|
    t.string   "uid",                                                         null: false
    t.string   "provider",                             default: "eve_online", null: false
    t.string   "encrypted_password",                   default: "",           null: false
    t.string   "reset_password_token",                 default: ""
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                        default: 0,            null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",                   default: "",           null: false
    t.string   "last_sign_in_ip",                      default: "",           null: false
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.text     "tokens",                 limit: 65535,                        null: false
    t.datetime "created_at",                                                  null: false
    t.datetime "updated_at",                                                  null: false
  end

end
