module Token
  extend self

  class InvalidError < StandardError
  end

  def encode(user, expires_in: 2.hours.from_now)
    payload = { id: user.id, exp: expires_in.to_i }
    JWT.encode(payload, secret)
  end

  def decode(token)
    jwt = JWT.decode(token, secret)[0]
    # use fetch so if ID doesn't exist it will raise an error
    StaffUser.find(jwt.fetch("id"))
  rescue JWT::DecodeError, ActiveRecord::RecordNotFound
    raise InvalidError, "Not authenticated"
  end

  private

  def secret
    Rails.application.secret_key_base
  end
end
