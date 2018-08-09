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
      user = StaffUser.find(json['user']['id'])
      cultural_center = user.cultural_center

      expect(response.status).to eq(200)
      expect(user.username).to eq("newuser12345")
      expect(cultural_center.name).to eq("MoMA")
      expect(cultural_center.staff_users).to include(user)
    end

    it 'staff user and cultural center are not created if cultural center info is invalid' do
      expect { create_staff_user("user", "") }.to_not change(StaffUser, :count)
      expect(response.status).to eq(422)
      expect { create_staff_user("user", "") }.to_not change(CulturalCenter, :count)
      expect(response.status).to eq(422)
    end

    it 'staff user and cultural center are not created if user info is invalid' do
      expect { create_staff_user("", "Cultural Center") }.to_not change(StaffUser, :count)
      expect(response.status).to eq(422)
      expect { create_staff_user("", "Cultural Center") }.to_not change(CulturalCenter, :count)
      expect(response.status).to eq(422)
    end

    it 'returns an error message when the password and confirmation do not match' do
      user = build :staff_user
      post :create, params: {
        user: {
          username: user.username,
          password: "bananafeet",
          password_confirmation: "wrongpassword"
        },
        cultural_center: {
          name: user.cultural_center.name
        }
      }

      expect(response.status).to eq(422)
    end
  end
end
