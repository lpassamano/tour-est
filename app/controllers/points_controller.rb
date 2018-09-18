class PointsController < ApplicationController
  skip_before_action :authenticate_staff_user!, only: [:index, :show]

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

    if @point.update(validated_params)
      render :show
    else
      render json: @point.errors, status: 422
    end
  end

  def index
    tour = Tour.find(params[:tour_id])
    @points = tour.points.includes(:image_blob, :image_attachment)
  end

  def show
    @point = Point.find(params[:id])
  end

  def destroy
    Point.find(params[:id]).destroy
    head :no_content
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

  def validated_params
    validated_params = point_params

    if validated_params.key?(:image) && validated_params[:image].blank?
      validated_params[:image] = nil
    end

    return validated_params
  end
end
