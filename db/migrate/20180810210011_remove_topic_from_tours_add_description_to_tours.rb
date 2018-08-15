class RemoveTopicFromToursAddDescriptionToTours < ActiveRecord::Migration[5.2]
  def change
    remove_column :tours, :topic, :text
    add_column :tours, :description, :text
  end
end
