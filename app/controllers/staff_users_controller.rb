class StaffUsersController < ApplicationController
  before_action :authenticate_staff_user, only: [:show]

  def index
    @staff_users = StaffUser.all
  end

  def show
    render :show
  end

  def create
    username = params[:username]
    password = params[:password]
    cultural_center = CulturalCenter.create_or_find_by name: params[:cultural_center]
    user = StaffUser.new(username: username, password: password, cultural_center: cultural_center)

    if user.save
      render json: { user: user}
    else
      render json: { error: "Bad Request" }, status: 400
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
end
