FactoryBot.define do
  factory :staff_user do
    username { Faker::Internet.username }
    password "bananafeet1120"
    cultural_center
  end

  factory :cultural_center do
    name "MoMA"
  end

  factory :tour do
    title { Faker::Lorem.word }
    staff_user
    cultural_center { staff_user.cultural_center }
  end

  factory :point do
    title { Faker::Lorem.word }
    tour
    order_key { tour.points.count }
  end
end
