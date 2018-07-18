require 'rails_helper'

RSpec.describe StaffUser, type: :model do
  it "has a working factory" do
    user = create :staff_user
    user2 = create :staff_user
    expect(user.username).to_not eq(user2.username)
  end
end
