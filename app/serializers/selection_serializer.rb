class SelectionSerializer < ActiveModel::Serializer
  attributes :id

  has_many :playlists
end
