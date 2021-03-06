class Point < ApplicationRecord
  validates :title, presence: true
  validates :order_key, presence: true

  belongs_to :tour
  has_one_attached :image

  def image=(value)
    image.purge
    image.attach(value)
  end
end
