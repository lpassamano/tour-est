class ToursController < ApplicationController
  def create
    @tour = Tour.new(tour_params)

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

  private

  def tour_params
    params.require(:tour).permit(:title, :staff_user_id, :cultural_center_id)
  end
end
