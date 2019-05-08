class Selection < ApplicationRecord
  belongs_to :user
  belongs_to :audio_feature

  has_many :playlists
  has_many :tracks, through: :playlists
  has_many :selection_genres
  has_many :genres, through: :selection_genres

  validates :audio_feature, :user, presence: true
end
