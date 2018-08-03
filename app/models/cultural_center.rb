class CulturalCenter < ApplicationRecord
  validates :name, presence: true

  has_many :staff_users
  has_many :tours
end
