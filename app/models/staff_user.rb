class StaffUser < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true
  validates :password, length: { minimum: 8 }

  belongs_to :cultural_center
  has_many :tours
end
