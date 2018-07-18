json.array! @staff_users do |user|
  json.extract! user, :id, :username, :cultural_center
end
