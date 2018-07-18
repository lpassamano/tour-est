class StaffUsersController < ApplicationController
  def index
    @staff_users = StaffUser.all
  end
end
