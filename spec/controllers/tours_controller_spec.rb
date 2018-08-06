require 'rails_helper'

RSpec.describe ToursController, type: :controller do
  it 'creates a tour when provided a title' do
    user = create :staff_user
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

  end

  it 'new tours are associated with the current staff user and their cultural center' do

  end

  it 'tour is not created if no title is given' do

  end
end
