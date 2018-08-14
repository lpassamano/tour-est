class RemoveTitleAddCaptionToPoints < ActiveRecord::Migration[5.2]
  def change
    remove_column :points, :title, :string
    add_column :points, :caption, :text
  end
end
