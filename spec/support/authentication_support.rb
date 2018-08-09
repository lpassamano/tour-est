module AuthenticationSupport
  def authenticate_staff_user(user)
    token = Token.encode(user)
    formatted_token = ActionController::HttpAuthentication::Token.encode_credentials(token)
    request.headers["authorization"] = formatted_token
  end
end
