class TrackSerializer < ActiveModel::Serializer
  attributes :name, :artist

  belongs_to :playlist
end
