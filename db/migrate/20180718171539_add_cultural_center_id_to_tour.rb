class AddCulturalCenterIdToTour < ActiveRecord::Migration[5.2]
  def change
    add_reference :tours, :cultural_center, foreign_key: true
  end
end
