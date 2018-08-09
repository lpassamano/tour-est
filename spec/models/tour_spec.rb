require 'rails_helper'

RSpec.describe Tour, type: :model do
  it 'has a working factory' do
    tour = create :tour
    tour2 = create :tour

    expect(tour).to_not eq(tour2)
  end

  context "Create Tour" do
    let(:user) { create :staff_user }

    it 'is invalid when the title is blank' do
      tour = build :tour, title: ""
      expect(tour).not_to be_valid
      expect(tour.errors[:title]).to include("can't be blank")
    end

    it 'tour is not created if it is not associated with a user' do
      params = {
        title: "Cool Tour",
        staff_user_id: "",
        cultural_center_id: "1"
      }
      expect { Tour.create(params) }.to_not change(Tour, :count)
    end

    it 'tour is not created if it is not associated with a cultural center' do
        params = {
          title: "Cool Tour",
          staff_user_id: user.id,
          cultural_center_id: ""
        }
        expect{ Tour.create(params) }.to_not change(Tour, :count)
    end
  end
end
