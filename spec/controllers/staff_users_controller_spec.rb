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
    it 'creates a staff user when provided valid username and password' do
      user = build :staff_user
      post :create, params: { username: user.username, password: user.password, cultural_center: user.cultural_center }
      expect(response.status).to eq(200)
      expect(json['id']).to eq(user.id)
    end
  end
end
