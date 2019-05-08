class Genre < ApplicationRecord
  has_many :selection_genres
  has_many :selections, through: :selection_genres

  validates :name, presence: true
end
