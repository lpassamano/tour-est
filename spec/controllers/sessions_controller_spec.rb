require 'rails_helper'

RSpec.describe SessionsController do
  describe "post create" do
    it 'provides a token when given a username and password' do
      user = create :staff_user
      post :create, params: {username: user.username, password: "password123"}
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to eq("token" => "abc123")
    end

    it 'is not successful if no username and password is provided' do
      post :create
      expect(response.status).to eq(401)
    end

    it 'is not successful if no password is provided' do
      user = create :staff_user
      post :create, params: {username: user.username}
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)).to include("error")
    end

    it 'is not successful if an incorrect password is provided' do
      user = create :staff_user
      post :create, params: {username: user.username, password: "abc123"}
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)).to include("error")
    end

    it 'is not successful if an incorrect username is provided' do
      user = create :staff_user
      name = user.username + "1"
      post :create, params: {username: name, password: "password123"}
      expect(response.status).to eq(401)
      expect(JSON.parse(response.body)).to include("error")
    end
  end
end
