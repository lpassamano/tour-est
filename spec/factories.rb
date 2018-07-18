FactoryBot.define do
  factory :staff_user do
    username {Faker::Internet.username}
    password "password123"
    cultural_center
  end

  factory :cultural_center do
    name "MoMA"
  end
end
