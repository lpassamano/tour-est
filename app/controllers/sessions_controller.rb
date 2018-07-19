class SessionsController < ApplicationController
  def create
    username = params[:username]
    password = params[:password]

    user = StaffUser.find_by(username: username)
    if user&.authenticate(password)
      token = Token.encode(user)
      render json: { token: token }
    else
      # fix error message
      render json: { error: "Unauthorized" }, status: 401
    end
  end
end
