require 'rails_helper'

RSpec.describe Tour, type: :model do
  it 'has a working factory' do
    tour = create :tour
    tour2 = create :tour

    expect(tour.title).to_not eq(tour2.title)
  end

  context "Create Tour" do
    
  end
end
