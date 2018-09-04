class Tour < ApplicationRecord
  validates :title, presence: true

  belongs_to :staff_user
  belongs_to :cultural_center
  has_many :points, dependent: :destroy
end
