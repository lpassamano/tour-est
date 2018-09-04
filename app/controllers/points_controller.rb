class PointsController < ApplicationController
  def create
    tour = Tour.find(params[:tour_id])
    params = point_params

    params.delete("image") if point_params["image"] == ""

    @point = tour.points.build(params)

    if @point.save
      render :show
    else
      render json: @point.errors, status: 422
    end
  end

  def index
    tour = Tour.find(params[:tour_id])
    @points = tour.points.includes(:image_blob).includes(:image_attachment)
  end

  private

  def point_params
    params.require(:point).permit(
      :caption,
      :image
    )
  end
end
