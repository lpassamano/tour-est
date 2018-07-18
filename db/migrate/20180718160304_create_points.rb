class CreatePoints < ActiveRecord::Migration[5.2]
  def change
    create_table :points do |t|
      t.references :tour, foreign_key: true
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end
