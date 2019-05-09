class Playlist < ApplicationRecord
  belongs_to :selection
  has_many :tracks
end
