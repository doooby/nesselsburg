# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150321235344) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "exception_logs", force: :cascade do |t|
    t.string   "klass"
    t.text     "message"
    t.datetime "created_at"
    t.text     "params"
    t.text     "other_info"
    t.text     "backtrace"
    t.integer  "state",      default: 0
  end

  create_table "game_data", force: :cascade do |t|
    t.text     "game"
    t.text     "key"
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",                        null: false
    t.string   "email",                           null: false
    t.string   "encrypted_password",              null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
