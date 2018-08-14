class Tour < ApplicationRecord
  validates :title, presence: true

  belongs_to :staff_user
  belongs_to :cultural_center
  has_many :points

  accepts_nested_attributes_for :points,
    reject_if: ->(a) { a[:caption].blank? },
    allow_destroy: true
end
