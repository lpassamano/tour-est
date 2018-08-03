class StaffUser < ApplicationRecord
  has_secure_password

  validates :username, uniqueness: true, presence: true
  validates_confirmation_of :password
  validates :password, presence: true, password: true, if: -> { new_record? || changes[:password] }

  belongs_to :cultural_center, autosave: true
  has_many :tours
end
