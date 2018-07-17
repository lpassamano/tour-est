class CreateCulturalCenters < ActiveRecord::Migration[5.2]
  def change
    create_table :cultural_centers do |t|
      t.string :name

      t.timestamps
    end
  end
end
