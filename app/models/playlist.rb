class Playlist < ApplicationRecord
  belongs_to :selection
  has_many :tracks, :dependent => :delete_all
  has_many :genres, through: :selection

  has_one :audio_feature, through: :selection
end
