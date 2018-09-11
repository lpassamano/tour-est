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

  def update
    @point = Point.find(params[:id])
    @point.attributes = point_params.except(:image)

    if params[:imageEdited] == "true"
      @point.image.purge
      @point.image.attach(point_params[:image])
    end

    if @point.save
      render :show
    else
      render json: @point.errors, status: 422
    end
  end

  def index
    tour = Tour.find(params[:tour_id])
    @points = tour.points.includes(:image_blob, :image_attachment)
  end

  private

  def point_params
    params.require(:point).permit(
      :id,
      :title,
      :caption,
      :description,
      :location,
      :directions,
      :image
    )
  end
end
