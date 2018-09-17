class ToursController < ApplicationController
  skip_before_action :authenticate_staff_user!, only: [:index, :show]

  def create
    @tour = Tour.new(tour_params)
    @tour.staff_user = current_staff_user
    @tour.cultural_center = current_staff_user.cultural_center

    if @tour.save
      render :show
    else
      render json: @tour.errors, status: 422
    end
  end

  def update
    @tour = Tour.find(params[:id])
    @tour.update(tour_params)

    if @tour.save
      render :show
    else
      render json: @tour.errors, status: 422
    end
  end

  def index
    @tours = tours_scope.includes(points: [:image_blob, :image_attachment])
  end

  def show
    @tour = tours_scope.includes(points: [:image_blob, :image_attachment]).find(params[:id])
  end

  def destroy
    Tour.find(params[:id]).destroy
    head :no_content
  end

  private

  def tour_params
    params.require(:tour).permit(
      :title,
      :starting_point,
      :directions,
      :estimated_time,
      :description
    )
  end

  def tours_scope
    if staff_user_signed_in?
      current_staff_user.tours
    else
      Tour.all
    end
  end
end
