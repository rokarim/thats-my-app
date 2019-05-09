class SelectionGenre < ApplicationRecord
  belongs_to :selection
  belongs_to :genre

  validates :selection, presence: true
  validates :genre, presence: true
end
