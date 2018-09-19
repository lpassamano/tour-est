json.extract! tour, :title, :id, :starting_point, :directions, :estimated_time, :description

json.cultural_center do
  json.extract! tour.cultural_center, :name, :id
end

if image = tour.points.map(&:image).find(&:attached?)
  json.image rails_blob_path(image)
else
  json.image nil
end
