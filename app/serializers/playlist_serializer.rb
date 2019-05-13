class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :saved, :accurate, :genres, :audio_feature

  has_many :tracks
  belongs_to :selection
  has_one :audio_feature

  def genres
    return object.genres
  end

  def audio_feature
    return object.audio_feature
  end
end
