class Tour < ApplicationRecord
  belongs_to :staff_user
  belongs_to :cultural_center
  has_many :points
end
