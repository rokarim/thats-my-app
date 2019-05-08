class TrackSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :playlist
end
