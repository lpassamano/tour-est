require 'rails_helper'

RSpec.describe StaffUsersController, type: :controller do
  def json
    JSON.parse(response.body)
  end

  context "Existing Account Authentication" do
    it 'return current user when provided a valid token' do
      user = create :staff_user
      authenticate_staff_user(user)
      get :show, format: :json
      expect(response.status).to eq(200)
      expect(json['id']).to eq(user.id)
    end

    it 'does not return a user when provided a invalid token' do
      request.headers["authorization"] = "fdsfas"
      get :show, format: :json
      expect(response.status).to eq(401)
    end
  end

  context "New Account Authentication" do
    def create_staff_user(username = "newuser12345", cultural_center = "MoMA")
      post :create, params: {
        user: {
          username: username,
          password: "bananafeet",
          password_confirmation: "bananafeet"
        },
        cultural_center: {
          name: cultural_center
        }
      }
    end

    it 'creates a staff user when provided valid username, password, and cultural center' do
      create_staff_user

      user = StaffUser.all.last
      cultural_center = user.cultural_center

      expect(response.status).to eq(200)
      expect(user.username).to eq("newuser12345")
      expect(cultural_center.name).to eq("MoMA")
      expect(cultural_center.staff_users).to include(user)
    end

    it 'new staff user is associated with the given cultural center' do
      create_staff_user("user123", "Met Museum")
      user = StaffUser.all.last
      cultural_center = user.cultural_center

      expect(cultural_center.name).to eq("Met Museum")
      expect(cultural_center.staff_users).to include(user)
    end

    it 'if the cultural center already exists, the new user is associated with it' do
      create_staff_user("user")
      create_staff_user("user2")
      user = StaffUser.find_by(username: "user")
      user2 = StaffUser.find_by(username: "user2")

      expect(user.cultural_center == user2.cultural_center).to eq(true)
    end

    it 'staff user and cultural center are not created if cultural center info is invalid' do
      create_staff_user("user", "")
      user = StaffUser.find_by(username: "user")
      cultural_center = CulturalCenter.all.last

      expect(user).to eq(nil)
      expect(cultural_center).to eq(nil)
    end

    it 'staff user and cultural center are not create if user info is invalid' do
      create_staff_user("", "Cultural Center")
      user = StaffUser.all.last
      cultural_center = CulturalCenter.find_by(name: "Cultural Center")

      expect(user).to eq(nil)
      expect(cultural_center).to eq(nil)
    end

    it 'returns an error message when the password and confirmation do not match' do
      user = build :staff_user
      post :create, params: {
        user: {
          username: user.username,
          password: "bananafeet",
          password_confirmation: ""
        },
        cultural_center: {
          name: user.cultural_center.name
        }
      }

      expect(response.status).to eq(422)
    end
  end
end
