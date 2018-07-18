class CulturalCentersController < ApplicationController
  def index
    @cultural_centers = CulturalCenter.all
  end
end
