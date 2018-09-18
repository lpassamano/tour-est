json.extract! tour, :title, :id, :starting_point, :directions, :estimated_time, :description

if image = tour.points.map(&:image).find(&:attached?)
  json.image rails_blob_path(image)
else
  json.image nil
end
