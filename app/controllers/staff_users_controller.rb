class StaffUsersController < ApplicationController
  def index
    @staff_users = StaffUser.all
  end

  def show
    # send header to server
    render :show
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
