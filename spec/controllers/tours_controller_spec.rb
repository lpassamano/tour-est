require 'rails_helper'

RSpec.describe ToursController, type: :controller do
  let(:user) { create :staff_user }

  let :valid_params do
    {
      tour: {
        title: "Greco-Roman Sculpture",
        staff_user_id: user.id,
        cultural_center_id: user.cultural_center.id,
        starting_point: "Greek and Roman Gallery 3",
        directions: "Go past the welcome desk and into the hallway to the right",
        estimated_time: "2 hours",
        description: "This tour focuses on sculpture made during the Greek and Roman Empires"
      },
      format: :json
    }
  end

  let :invalid_params do
    valid_params.deep_merge(tour: { title: "" })
  end

  let(:json) { JSON.parse(response.body) }

  context "User authenticated" do
    before do
      authenticate_staff_user(user)
    end

    it 'creates a tour associated with the current user and their cultural center when provided valid data' do
      post :create, params: valid_params
      tour = Tour.find(json['id'])

      expect(response.status).to eq(200)
      expect(tour.title).to eq("Greco-Roman Sculpture")
      expect(tour.staff_user).to eq(user)
      expect(tour.cultural_center).to eq(user.cultural_center)
      expect(tour.starting_point).to eq("Greek and Roman Gallery 3")
      expect(tour.directions).to eq("Go past the welcome desk and into the hallway to the right")
      expect(tour.estimated_time).to eq("2 hours")
      expect(tour.description).to eq("This tour focuses on sculpture made during the Greek and Roman Empires")
    end

    it 'does not create a tour when provided invalid data' do
      expect { post :create, params: invalid_params }.to_not change(Tour, :count)
      expect(response.status).to eq(422)
    end

    it 'updates a tour when provided valid data' do
      post :create, params: valid_params
      new_params = valid_params.deep_merge(tour: { title: "New Title", id: json['id']}, id: json['id'])
      patch :update, params: new_params
      tour = Tour.find(json['id'])

      expect(response.status).to eq(200)
      expect(tour.title).to eq("New Title")
    end

    it 'does not update a tour when provided invalid data' do
      post :create, params: valid_params
      new_params = valid_params.deep_merge(tour: { title: "", id: json['id']}, id: json['id'])
      patch :update, params: new_params
      tour = Tour.find(json['id'])

      expect(response.status).to eq(422)
      expect(tour.title).to eq(valid_params[:tour][:title])
    end

    it 'deletes a tour when provided a tour id' do
      post :create, params: valid_params
      new_params = valid_params.deep_merge(tour: { title: "", id: json['id']}, id: json['id'])
      delete :destroy, params: new_params

      expect(response.status).to eq(204)
      expect(Tour.count).to eq(0)
    end
  end

  context "User not authenticated" do
    it 'tour can only be created if a staff user is logged in' do
      expect { post :create, params: valid_params }.to_not change(Tour, :count)
      expect(response.status).to eq(401)
    end

    it 'tours can be listed when user is not logged in' do
      get :index, format: :json
      expect(response.status).to eq(200)
    end
  end
end
