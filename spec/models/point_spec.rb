require 'rails_helper'

RSpec.describe Point, type: :model do
  it 'has a working factory' do
    point = create :point
    point2 = create :point

    expect(point).to_not eq(point2)
  end
end
