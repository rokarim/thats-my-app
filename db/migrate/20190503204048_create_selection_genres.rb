class CreateSelectionGenres < ActiveRecord::Migration[5.2]
  def change
    create_table :selection_genres do |t|
      t.belongs_to :genre, null: false
      t.belongs_to :selection, null: false
    end
  end
end
