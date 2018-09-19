class AddOrderKeyToPoints < ActiveRecord::Migration[5.2]
  def change
    add_column :points, :order_key, :integer, null: false
    add_index :points, [:tour_id, :order_key], unique: true
  end
end
