# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_09_29_204158) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "actions", force: :cascade do |t|
    t.string "type_of_entity"
    t.string "type_of_action"
    t.string "content"
    t.bigint "entity_id", null: false
    t.bigint "tag_id"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["entity_id"], name: "index_actions_on_entity_id"
    t.index ["tag_id"], name: "index_actions_on_tag_id"
    t.index ["user_id"], name: "index_actions_on_user_id"
  end

  create_table "actions_entities", id: false, force: :cascade do |t|
    t.bigint "entity_id", null: false
    t.bigint "action_id", null: false
    t.index ["action_id", "entity_id"], name: "index_actions_entities_on_action_id_and_entity_id"
    t.index ["entity_id", "action_id"], name: "index_actions_entities_on_entity_id_and_action_id"
  end

  create_table "actions_tags", id: false, force: :cascade do |t|
    t.bigint "action_id", null: false
    t.bigint "tag_id", null: false
    t.index ["action_id", "tag_id"], name: "index_actions_tags_on_action_id_and_tag_id"
    t.index ["tag_id", "action_id"], name: "index_actions_tags_on_tag_id_and_action_id"
  end

  create_table "entities", force: :cascade do |t|
    t.string "name"
    t.string "content"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_entities_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_relationships", force: :cascade do |t|
    t.bigint "user_one_id", null: false
    t.bigint "user_two_id", null: false
    t.string "status"
    t.bigint "last_user_action_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["last_user_action_id"], name: "index_user_relationships_on_last_user_action_id"
    t.index ["user_one_id"], name: "index_user_relationships_on_user_one_id"
    t.index ["user_two_id"], name: "index_user_relationships_on_user_two_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
  end

  add_foreign_key "actions", "entities"
  add_foreign_key "actions", "tags"
  add_foreign_key "actions", "users"
  add_foreign_key "entities", "users"
  add_foreign_key "user_relationships", "users", column: "last_user_action_id"
  add_foreign_key "user_relationships", "users", column: "user_one_id"
  add_foreign_key "user_relationships", "users", column: "user_two_id"
end
