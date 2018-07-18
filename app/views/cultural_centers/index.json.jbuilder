json.array! @cultural_centers do |center|
  json.extract! center, :id, :name
end
