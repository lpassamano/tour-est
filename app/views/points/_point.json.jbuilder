json.extract! point, :id, :caption

if point.image.attached?
  json.image rails_blob_path(point.image)
else
  json.image nil
end
