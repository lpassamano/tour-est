class StaffUser < ApplicationRecord
  has_secure_password
  # use this gem for password strength validations:
  # https://github.com/cmer/nobspw

  validates :username, uniqueness: true
  validates :password, length: { minimum: 8 }

  belongs_to :cultural_center
  has_many :tours
end
