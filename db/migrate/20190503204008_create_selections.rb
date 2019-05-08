class CreateSelections < ActiveRecord::Migration[5.2]
  def change
    create_table :selections do |t|
      t.belongs_to :audio_feature, null: false
      t.belongs_to :user, null: false
    end
  end
end
