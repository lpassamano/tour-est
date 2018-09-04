json.extract! point, :id, :title, :caption, :description, :location, :directions

if point.image.attached?
  json.image rails_blob_path(point.image)
else
  json.image nil
end
