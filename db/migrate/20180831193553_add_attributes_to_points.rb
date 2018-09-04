class AddAttributesToPoints < ActiveRecord::Migration[5.2]
  def change
    add_column :points, :title, :string
    add_column :points, :location, :string
    add_column :points, :directions, :text
  end
end
