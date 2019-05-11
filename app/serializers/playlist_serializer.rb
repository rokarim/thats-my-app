class PlaylistSerializer < ActiveModel::Serializer
  attributes :id, :name, :saved, :accurate

  has_many :tracks
end
