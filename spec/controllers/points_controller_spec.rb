require 'rails_helper'

RSpec.describe PointsController, type: :controller do
  let(:json) { JSON.parse(response.body) }

  let(:tour) { create :tour }

  let(:user) { create :staff_user }

  before do
    authenticate_staff_user(user)
  end

  let :valid_params do
    {
      title: "Melancholia by Durer",
      image: fixture_file_upload("melancholia.jpeg")
    }
  end

  let(:invalid_params) { {title: ""} }

  it 'creates a point when given valid data' do
    post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
    expect(response.status).to eq(200)
  end

  it 'creates a point with an image attached' do
    post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
    point = Point.find(json['id'])

    expect(point.image).to be_attached
    expect(json['image']).not_to be_nil
  end

  it 'does not create a tour without a title' do
    expect {
      post :create, params: { tour_id: tour.id, point: invalid_params, format: :json }
    }.to_not change(Point, :count)
    expect(response.status).to eq(422)
  end
end
