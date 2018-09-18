class PagesController < ApplicationController
  skip_before_action :authenticate_staff_user!, only: [:index]

  def index
  end
end
