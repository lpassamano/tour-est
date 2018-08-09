require 'rails_helper'
require 'pp'

RSpec.describe SessionsController do
  describe "post create" do

    let :json { JSON.parse(response.body) }

    it 'provides a token when given a username and password' do
      user = create :staff_user
      post :create, params: { username: user.username, password: user.password }
      user.reload
      expect(response.status).to eq(200)
      decoded = Token.decode(json["token"])
      expect(decoded).to eq(user)
    end

    it 'is not successful if no username and password is provided' do
      post :create
      expect(response.status).to eq(401)
    end

    it 'is not successful if no password is provided' do
      user = create :staff_user
      post :create, params: { username: user.username }
      expect(response.status).to eq(401)
      expect(json).to include("error")
    end

    it 'is not successful if an incorrect password is provided' do
      user = create :staff_user
      post :create, params: { username: user.username, password: "abc123" }
      expect(response.status).to eq(401)
      expect(json).to include("error")
    end

    it 'is not successful if an incorrect username is provided' do
      user = create :staff_user
      name = user.username + "1"
      post :create, params: { username: name, password: user.password }
      expect(response.status).to eq(401)
      expect(json).to include("error")
    end
  end
end
