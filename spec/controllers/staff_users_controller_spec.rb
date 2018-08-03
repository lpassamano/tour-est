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
      post :create, params: {
        user: {
          username: user.username,
          password: "bananafeet",
          password_confirmation: "bananafeet"
        },
        cultural_center: {
          name: user.cultural_center.name
        }
      }
      expect(response.status).to eq(200)
      expect(json['id']).to eq(user.id)
    end

    # TODO
    # see if user was created and cultural center created
    # see what happens when user valid, cc in valid
    # see what happends when user invalid cc valid
    # in cc model validates name presence
    # if both valid they are created and associated
    # auto save true to cc assocation in user model asociation

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
