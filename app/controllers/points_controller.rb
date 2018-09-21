class PointsController < ApplicationController
  before_action :authenticate_staff_user!, except: [:index, :show]
  before_action :authenticate_staff_user, only: [:index, :show]

  def create
    tour = current_staff_user.tours.find(params[:tour_id])
    @point = tour.points.build(point_params)
    @point.order_key = tour.points.count

    if @point.save
      render :show
    else
      render json: @point.errors, status: 422
    end
  end

  def update
    @point = current_staff_user.tours.find(params[:tour_id]).points.find(params[:id])

    if @point.update(validated_params)
      render :show
    else
      render json: @point.errors, status: 422
    end
  end

  def index
    @points = points_scope.where(tour_id: params[:tour_id])
                          .includes(:image_blob, :image_attachment)
  end

  def show
    @point = points_scope.find(params[:id])
  end

  def destroy
    point = current_staff_user.tours.find(params[:tour_id]).points.find(params[:id])

    Point.transaction do
      point.destroy!
      point.tour.reorder_points!
    end

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

  def points_scope
    if staff_user_signed_in?
      current_staff_user.points
    else
      Point.all
    end
  end
end
