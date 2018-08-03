class AddPasswordConfirmationToStaffUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :staff_users, :password_confirmation, :string
  end
end
