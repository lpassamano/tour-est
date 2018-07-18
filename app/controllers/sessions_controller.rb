class SessionsController < ApplicationController
  def create
    username = params[:username]
    password = params[:password]

    user = StaffUser.find_by(username: username)
    if user&.authenticate(password)
      render json: {token: "abc123"}
    else
      render json: {error: "bad"}, status: 401
    end
  end

  def delete

  end

end
