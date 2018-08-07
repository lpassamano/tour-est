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
    # how to test? dashboard is only accessible when logged in...
    # since it gets the staff user/cc info from the dashboard, can test to make
    # sure not created w/out a user or cc
    # delete header and make sure you get back 422
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

  # move these validation tests to model tests
  # make 1 validation controller test
  # make 2 contexts, authenticated and not
  it 'tour is not created if no title is given' do
    count1 = Tour.all.count
    authenticate_staff_user(user)
    post :create, params: {
      tour: {
        title: "",
        staff_user_id: user.id,
        cultural_center_id: user.cultural_center.id
      }
    }
    count2 = Tour.all.count
    expect(response.status).to eq(422)
    expect(count1).to eq(count2)
  end

  it 'tour is not created if it is not associated with a user' do
    authenticate_staff_user(user)
    count1 = Tour.all.count
    post :create, params: {
      tour: {
        title: "Cool Tour",
        staff_user_id: "",
        cultural_center_id: "1"
      }
    }
    count2 = Tour.all.count
    expect(response.status).to eq(422)
    expect(count1).to eq(count2)
  end

  it 'tour is not created if it is not associated with a cultural center' do
    authenticate_staff_user(user)
    expect {
      post :create, params: {
        tour: {
          title: "Cool Tour",
          staff_user_id: user.id,
          cultural_center_id: ""
        }
      }
    }.to_not change(Tour, :count)

    expect(response.status).to eq(422)
  end
end
