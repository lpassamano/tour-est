require 'rails_helper'

RSpec.describe PointsController, type: :controller do
  let(:json) { JSON.parse(response.body) }

  let(:tour) { create :tour }

  let(:user) { create :staff_user }

  before do
    authenticate_staff_user(user)
  end

  let :params do
    {
      caption: "Melancholia by Durer",
      image: fixture_file_upload("melancholia.jpeg")
    }
  end

  it 'creates a point with an image' do
    post :create, params: { tour_id: tour.id, point: params, format: :json }
    expect(response.status).to eq(200)

    point = Point.find(json['id'])
    expect(point.image).to be_attached
  end
end
