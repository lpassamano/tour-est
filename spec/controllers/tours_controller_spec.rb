require 'rails_helper'

RSpec.describe ToursController, type: :controller do
  let(:user) { create :staff_user }

  it 'creates a tour when provided a title' do
    authenticate_staff_user(user)
    post :create, params: {
      tour: {
        title: "Awesome Tour",
        staff_user_id: user.id,
        cultural_center_id: user.cultural_center.id
      }
    }
    tour = Tour.all.last

    expect(response.status).to eq(200)
    expect(tour.title).to eq("Awesome Tour")
  end

  it 'can only be created if a staff user is logged in' do
    post :create, params: {
      tour: {
        title: "Awesome Tour",
        staff_user_id: "1",
        cultural_center_id: "1"
      }
    }

    expect(response.status).to eq(401)
  end

  it 'new tours are associated with the current staff user and their cultural center' do
    authenticate_staff_user(user)
    post :create, params: {
      tour: {
        title: "Really cool tour",
        staff_user_id: user.id,
        cultural_center_id: user.cultural_center.id
      }
    }
    tour = Tour.all.last

    expect(response.status).to eq(200)
    expect(tour.staff_user).to eq(user)
    expect(tour.cultural_center).to eq(user.cultural_center)
  end

  # make 1 validation controller test
  # make 2 contexts, authenticated and not

end
