class Point < ApplicationRecord
  validates :title, presence: true

  belongs_to :tour
  has_one_attached :image
end
