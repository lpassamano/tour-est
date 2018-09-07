json.extract! tour, :title, :id, :starting_point, :directions, :estimated_time, :description

tour.points.find do |point|
  if point.image.attached?
    json.image rails_blob_path(point.image)
  end
end
