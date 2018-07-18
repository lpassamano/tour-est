class CulturalCenter < ApplicationRecord
  has_many :staff_users
  has_many :tours
end
