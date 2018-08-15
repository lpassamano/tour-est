class PointsController < ApplicationController
  def create
    tour = Tour.find(params[:tour_id])
    @point = tour.points.build(point_params)

    if @point.save
      render :show
    else
      render json: @point.errors, status: 422
    end
  end

  def index
    @points = Tour.find(params[:tour_id]).points
  end

  private

  def point_params
    params.require(:point).permit(
      :caption
    )
  end
end
