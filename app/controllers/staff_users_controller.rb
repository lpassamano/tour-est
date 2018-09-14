class StaffUsersController < ApplicationController
  skip_before_action :authenticate_staff_user!, only: [:create]

  def index
    @staff_users = StaffUser.all
  end

  def show
    render :show
  end

  def create
    user = StaffUser.new(staff_user_params)
    user.cultural_center = CulturalCenter.find_or_initialize_by(cultural_center_params)

    if user.save
      render json: { user: user}
    else
      render json: user.errors, status: 422
    end
  end

  private

  def staff_user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

  def cultural_center_params
    params.require(:cultural_center).permit(:name)
  end
end
