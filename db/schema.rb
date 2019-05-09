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

ActiveRecord::Schema.define(version: 2019_05_03_204056) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "audio_features", force: :cascade do |t|
    t.string "activity_name", null: false
    t.float "min_acousticness"
    t.float "max_acousticness"
    t.float "min_danceability"
    t.float "max_danceability"
    t.float "min_energy"
    t.float "max_energy"
    t.float "min_instrumentalness"
    t.float "max_instrumentalness"
    t.integer "target_mode"
    t.float "min_speechiness"
    t.float "max_speechiness"
    t.float "min_tempo"
    t.float "max_tempo"
    t.float "min_valence"
    t.float "max_valence"
    t.float "min_popularity"
    t.float "max_popularity"
    t.float "min_loudness"
    t.float "max_loudness"
  end

  create_table "genres", force: :cascade do |t|
    t.string "name", null: false
  end

  create_table "playlists", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.boolean "accurate", default: false, null: false
    t.boolean "saved", default: false, null: false
    t.bigint "selection_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["selection_id"], name: "index_playlists_on_selection_id"
  end

  create_table "selection_genres", force: :cascade do |t|
    t.bigint "genre_id", null: false
    t.bigint "selection_id", null: false
    t.index ["genre_id"], name: "index_selection_genres_on_genre_id"
    t.index ["selection_id"], name: "index_selection_genres_on_selection_id"
  end

  create_table "selections", force: :cascade do |t|
    t.bigint "audio_feature_id", null: false
    t.bigint "user_id", null: false
    t.index ["audio_feature_id"], name: "index_selections_on_audio_feature_id"
    t.index ["user_id"], name: "index_selections_on_user_id"
  end

  create_table "tracks", force: :cascade do |t|
    t.string "name", null: false
    t.string "artist", null: false
    t.bigint "playlist_id", null: false
    t.string "spotify_track_id", null: false
    t.index ["playlist_id"], name: "index_tracks_on_playlist_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", default: "", null: false
    t.string "access_token", default: "", null: false
    t.string "refresh_token", default: "", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
