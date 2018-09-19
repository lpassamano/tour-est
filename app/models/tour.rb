class Tour < ApplicationRecord
  validates :title, presence: true

  belongs_to :staff_user
  belongs_to :cultural_center
  has_many :points, -> { order(:order_key) }, dependent: :destroy

  def reorder_points!
    points.order(:order_key).each_with_index do |point, index|
      point.update!(order_key: index)
    end
  end
end
