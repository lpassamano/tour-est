class CreateStaffUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :staff_users do |t|
      t.references :cultural_center, foreign_key: true
      t.string :username
      t.string :password_digest

      t.timestamps
    end
  end
end
