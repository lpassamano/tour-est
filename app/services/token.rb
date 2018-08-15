module Token
  extend self

  def encode(user, expires_in: 2.hours.from_now)
    payload = { id: user.id, exp: expires_in.to_i }
    JWT.encode(payload, secret)
  end

  def decode(token)
    jwt = JWT.decode(token, secret)[0]
    # use fetch so if id doesn't exit then it would return nil, will now raise an error instead
    StaffUser.find(jwt.fetch("id"))
  end

  private

  def secret
    Rails.application.secret_key_base
  end
end
