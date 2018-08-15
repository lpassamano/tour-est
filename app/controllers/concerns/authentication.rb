module Authentication
  extend ActiveSupport::Concern
  included do
    helper_method :current_staff_user

    rescue_from Token::InvalidError do |error|
      render status: 401, json: { error: error.message }
    end
  end

  def current_staff_user
    @current_user ||= authenticate_staff_user
  end

  def authenticate_staff_user
    authenticate_or_request_with_http_token do |token, _options|
      Token.decode(token)
    end
  end
end
