class ToursController < ApplicationController
  def create
    tour = Tour.new(tour_params)

    if tour.save
      render json: { tour: tour }
    else
      render json: tour.errors, status: 422
    end
  end

  private

  def tour_params
    params.require(:tour).permit(:title, :staff_user_id, :cultural_center_id)
  end
end
