class StaffUser < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true
  validates :password, presence: true, password: true, if: -> { new_record? || changes[:password] }
  # HALP!
  validates_confirmation_of :password

  belongs_to :cultural_center
  has_many :tours
end
