require 'rails_helper'

RSpec.describe StaffUsersController, type: :controller do
  def json
    JSON.parse(response.body)
  end

  context "Existing Account Authentication" do
    def authenticate_staff_user(user)
      token = Token.encode(user)
      formatted_token = ActionController::HttpAuthentication::Token.encode_credentials(token)
      request.headers["authorization"] = formatted_token
    end

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
    def create_staff_user(username, cultural_center)
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
      create_staff_user("newuser12345", "MoMA")
      user = StaffUser.last
      cultural_center = user.cultural_center

      expect(response.status).to eq(200)
      expect(user.username).to eq("newuser12345")
      expect(cultural_center.name).to eq("MoMA")
      expect(cultural_center.staff_users).to include(user)
    end

    it 'staff user and cultural center are not created if cultural center info is invalid' do
      create_staff_user("user", "")
      user = StaffUser.find_by(username: "user")
      cultural_center = CulturalCenter.last

      expect(user).to eq(nil)
      expect(cultural_center).to eq(nil)
    end

    it 'staff user and cultural center are not created if user info is invalid' do
      create_staff_user("", "Cultural Center")
      user = StaffUser.last
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
