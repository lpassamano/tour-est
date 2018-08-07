class SessionsController < ApplicationController
  skip_before_action :authenticate_staff_user, only: [:create]

  def create
    username = params[:username]
    password = params[:password]

    user = StaffUser.find_by(username: username)
    if user&.authenticate(password)
      token = Token.encode(user)
      render json: { token: token }
    else
      render json: { error: "Unauthorized" }, status: 401
    end
  end
end
