class CreatePlaylists < ActiveRecord::Migration[5.2]
  def change
    create_table :playlists do |t|
      t.string :name, null: false, default: ""
      t.boolean :accurate, null: false, default: false
      t.boolean :saved, null: false, default: false
      t.belongs_to :selection, null: false
      t.timestamps
    end
  end
end
