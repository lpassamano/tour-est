class CreateTours < ActiveRecord::Migration[5.2]
  def change
    create_table :tours do |t|
      t.string :title
      t.references :staff_user, foreign_key: true

      t.timestamps
    end
  end
end
