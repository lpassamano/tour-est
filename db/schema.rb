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

ActiveRecord::Schema.define(version: 2018_08_10_210011) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cultural_centers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "points", force: :cascade do |t|
    t.bigint "tour_id"
    t.string "title"
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tour_id"], name: "index_points_on_tour_id"
  end

  create_table "staff_users", force: :cascade do |t|
    t.bigint "cultural_center_id"
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_confirmation"
    t.index ["cultural_center_id"], name: "index_staff_users_on_cultural_center_id"
  end

  create_table "tours", force: :cascade do |t|
    t.string "title"
    t.bigint "staff_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "cultural_center_id"
    t.string "starting_point"
    t.text "directions"
    t.string "estimated_time"
    t.text "description"
    t.index ["cultural_center_id"], name: "index_tours_on_cultural_center_id"
    t.index ["staff_user_id"], name: "index_tours_on_staff_user_id"
  end

  add_foreign_key "points", "tours"
  add_foreign_key "staff_users", "cultural_centers"
  add_foreign_key "tours", "cultural_centers"
  add_foreign_key "tours", "staff_users"
end
