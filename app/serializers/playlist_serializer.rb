class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :tracks
end
