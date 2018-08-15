json.array! @points do |point|
  json.partial! "points/point", point: point
end
