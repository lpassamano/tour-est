require 'rails_helper'

RSpec.describe StaffUser, type: :model do
  it "has a working factory" do
    user = create :staff_user
    user2 = create :staff_user
    expect(user.username).to_not eq(user2.username)
  end

  context "Create Account" do
    it 'must use a unique username' do
      user = create :staff_user
      new_user = build :staff_user, username: user.username
      expect(new_user).to_not be_valid
      expect(new_user.errors[:username]).to include('has already been taken')
    end

    it "can't have a password with less than 8 characters" do
      user = build :staff_user, password: "1"
      expect(user).to_not be_valid
      expect(user.errors[:password].first).to include('is too short')
    end

    it "is valid with a valid password" do
      user = build :staff_user, password: "asdfjkl;"
      expect(user).to be_valid
    end
  end
end
