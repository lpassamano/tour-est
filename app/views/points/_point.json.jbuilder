json.extract! point, :id, :caption
json.image do
  rails_blob_path(point.image) if point.image.attached?
end
