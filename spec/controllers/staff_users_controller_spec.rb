require 'rails_helper'

RSpec.describe StaffUsersController, type: :controller do
  context "Account Authentication" do
    def json
      JSON.parse(response.body)
    end

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

  context "Create Account" do
    it 'must use a unique username' do
      user = create :staff_user
      cultural_center = create :cultural_center
      new_user = StaffUser.new(username: user.username, password: "asdfjkl;", cultural_center: cultural_center)
      expect(new_user.valid?).to eq(false)
    end

    it 'must have a valid password' do
      # create my own validations in the model or is there a gem for that?
    end

    it 'creates a new user in the database' do
      # should I even bother testing this?
      user = create :staff_user
      expect(StaffUser.all.last).to eq(user)
    end

    it 'logs the user in after their account is created' do
      # should this be tested here or in the JS test suite?
    end
  end
end
