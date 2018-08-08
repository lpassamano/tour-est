json.array! @tours do |tour|
  json.partial! "tours/tour", tour: tour
end
