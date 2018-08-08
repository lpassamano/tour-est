require 'rails_helper'

RSpec.describe ToursController, type: :controller do
  let(:user) { create :staff_user }

  let :valid_params do
    {
      tour: {
        title: "Awesome Tour",
        staff_user_id: user.id,
        cultural_center_id: user.cultural_center.id
      }
    }
  end

  let :invalid_params do
    valid_params.deep_merge(tour: { title: "" })
  end

  context "User authenticated" do
    before(:each) do
      authenticate_staff_user(user)
    end

    it 'creates a tour associated with the current user and their cultural center when provided valid data' do
      post :create, params: valid_params
      tour = Tour.all.last

      expect(response.status).to eq(200)
      expect(tour.title).to eq("Awesome Tour")
      expect(tour.staff_user).to eq(user)
      expect(tour.cultural_center).to eq(user.cultural_center)
    end

    it 'does not create a tour when provided invalid data' do
      expect { post :create, params: invalid_params }.to_not change(Tour, :count)
      expect(response.status).to eq(422)
    end
  end

  context "User not authenticated" do
    it 'tour can only be created if a staff user is logged in' do
      expect { post :create, params: valid_params }.to_not change(Tour, :count)
      expect(response.status).to eq(401)
    end
  end
end
