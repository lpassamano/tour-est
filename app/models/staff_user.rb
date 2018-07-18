class StaffUser < ApplicationRecord
  has_secure_password
  belongs_to :cultural_center
end
