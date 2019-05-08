class Playlist < ApplicationRecord
  belongs_to :selection
  has_many :tracks

  validates :saved, presence: true
  validates :accurate, presence: true
end
