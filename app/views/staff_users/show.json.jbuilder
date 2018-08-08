json.extract! current_staff_user, :id, :username, :tours
json.cultural_center do
  json.extract! current_staff_user.cultural_center, :name, :id
end
