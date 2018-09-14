class ApplicationController < ActionController::Base
  include Authentication

  before_action :authenticate_staff_user!
end
