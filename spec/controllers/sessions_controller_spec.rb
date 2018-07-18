require 'rails_helper'

RSpec.describe SessionsController do
  describe "post create" do
    it 'is successful' do
      # update for 401 status for failure
      post :create
      expect(response).to_not be_successful
    end

    it 'provides a token when given a username and password' do
      user = create :staff_user
      post :create, params: {username: user.username, password: "password123"}
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to eq("token" => "abc123")
    end

    # other tests, no password, bad password, bad username 
  end
end
