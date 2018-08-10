class AddFieldsToTours < ActiveRecord::Migration[5.2]
  def change
    add_column :tours, :starting_point, :string
    add_column :tours, :directions, :text
    add_column :tours, :estimated_time, :string
    add_column :tours, :topic, :text
  end
end
