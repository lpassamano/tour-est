class StaffUser < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true

  belongs_to :cultural_center
  has_many :tours
end
