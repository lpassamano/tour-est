require 'rails_helper'

RSpec.describe PointsController, type: :controller do
  let(:json) { JSON.parse(response.body) }

  let(:tour) { create :tour }

  let(:user) { create :staff_user }

  let :valid_params do
    {
      title: "Melancholia by Durer",
      image: fixture_file_upload("melancholia.jpeg")
    }
  end

  let(:invalid_params) { {title: ""} }

  context "User authenticated" do
    before do
      authenticate_staff_user(user)
    end

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

    it 'updates a point when provided valid data' do
      post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
      new_params = { title: "Not Melancholia", id: json['id'] }
      patch :update, params: { tour_id: tour.id, id: json['id'], point: new_params, format: :json }
      point = Point.find(json['id'])

      expect(response.status).to eq(200)
      expect(point.title).to eq("Not Melancholia")
    end

    it 'does not update a point when provided invalid data' do
      post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
      new_params = { title: "", id: json['id'] }
      patch :update, params: { tour_id: tour.id, id: json['id'], point: new_params, format: :json }
      point = Point.find(json['id'])

      expect(response.status).to eq(422)
      expect(point.title).to eq(valid_params[:title])
    end

    it 'updates an image when a new image is attached' do
      post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
      original_image_path = rails_blob_path(Point.find(json['id']).image)
      new_params = {
        title: "Mona Lisa",
        image: fixture_file_upload("mona_lisa.jpg"),
        id: json['id']
      }
      patch :update, params: {
        tour_id: tour.id,
        id: json['id'],
        point: new_params,
        imageEdited: "true",
        format: :json
      }
      point = Point.find(json['id'])

      expect(response.status).to eq(200)
      expect(original_image_path).to_not eq(rails_blob_path(point.image))
    end

    it 'does not change the image when a new image is not attached' do
      post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
      original_image_path = rails_blob_path(Point.find(json['id']).image)
      new_params = {
        title: "Not Melancholia",
        id: json['id']
      }
      patch :update, params: {
        tour_id: tour.id,
        id: json['id'],
        point: new_params,
        imageEdited: "false",
        format: :json
      }
      point = Point.find(json['id'])

      expect(response.status).to eq(200)
      expect(original_image_path).to eq(rails_blob_path(point.image))
    end

    it "deletes a point when provided a valid tour id and point id" do
      post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
      original_points_count = tour.points.count
      delete :destroy, params: { tour_id: tour.id, id: json['id'] }

      expect(response.status).to eq(204)
      expect(tour.points.count).to eq(original_points_count - 1)
    end

    it 'does not change the image when a new image is not attached' do
      post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
      original_image_path = rails_blob_path(Point.find(json['id']).image)
      new_params = {
        title: "Not Melancholia",
        id: json['id']
      }
      patch :update, params: {
        tour_id: tour.id,
        id: json['id'],
        point: new_params,
        format: :json
      }
      point = Point.find(json['id'])

      expect(response.status).to eq(200)
      expect(original_image_path).to eq(rails_blob_path(point.image))
    end

    it 'removes an image when the user deletes it' do
      post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
      new_params = {
        image: ""
      }
      patch :update, params: {
        tour_id: tour.id,
        id: json['id'],
        point: new_params,
        format: :json
      }
      point = Point.find(json['id'])

      expect(response.status).to eq(200)
      expect(point.image.attached?).to eq(false)
    end

    it "deletes a point when provided a valid tour id and point id" do
      post :create, params: { tour_id: tour.id, point: valid_params, format: :json }
      original_points_count = tour.points.count
      delete :destroy, params: { tour_id: tour.id, id: json['id'] }

      expect(response.status).to eq(204)
      expect(tour.points.count).to eq(original_points_count - 1)
    end
  end

  context "User not authenticated" do
    it 'point can only be crearted if a staff user is logged in' do
      expect{ post :create, params: {
        tour_id: tour.id,
        point: valid_params,
        format: :json
      }}.to_not change(Point, :count)
      expect(response.status).to eq(401)
    end

    it 'points can be listed when user is not logged in' do
      get :index, params: {tour_id: tour.id, format: :json}
      expect(response.status).to eq(200)
    end
  end
end
