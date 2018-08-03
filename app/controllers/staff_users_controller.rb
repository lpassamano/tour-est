class StaffUsersController < ApplicationController
  before_action :authenticate_staff_user, only: [:show]

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

  def current_staff_user
    @current_user ||= authenticate_staff_user
  end

  helper_method :current_staff_user

  def authenticate_staff_user
    authenticate_or_request_with_http_token do |token, _options|
      Token.decode(token)
    end
  end

  def staff_user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end

  def cultural_center_params
    params.require(:cultural_center).permit(:name)
  end
end
