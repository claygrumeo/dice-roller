class RollerController < ApplicationController

  def index
    unless helpers.logged_in?
      redirect_to root_path
    end
  end

end