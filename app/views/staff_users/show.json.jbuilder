json.extract! current_staff_user, :id, :username
json.cultural_center do
  json.extract! current_staff_user.cultural_center, :name
end
