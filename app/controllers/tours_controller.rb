class ToursController < ApplicationController
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
    @tours = current_staff_user.tours
  end

  def show
    @tour = current_staff_user.tours.find(params[:id])
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
end
