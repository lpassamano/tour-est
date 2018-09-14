module Authentication
  extend ActiveSupport::Concern

  included do
    attr_reader :current_staff_user

    helper_method :current_staff_user, :staff_user_signed_in?

    rescue_from Token::InvalidError do |error|
      render status: 401, json: { error: error.message }
    end
  end

  def staff_user_signed_in?
    !current_staff_user.nil?
  end

  def authenticate_staff_user!
    if user = authenticate_with_http_token { |token, _o| Token.decode(token) }
      @current_staff_user = user
    else
      request_http_token_authentication
    end
  end
end
