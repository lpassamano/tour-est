class Point < ApplicationRecord
  belongs_to :tour
  has_one_attached :image
end
