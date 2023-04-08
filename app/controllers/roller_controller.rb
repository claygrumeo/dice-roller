class RollerController < ApplicationController

  # If there is no logged in user, redirect to the login page.
  def index
    unless helpers.logged_in?
      redirect_to root_path
    end
  end

  # Create a new Roll in the DB and return the value of the roll
  # via helper function.
  def roll
    # Create roll and assign params to fields
    @roll = Roll.new
    @roll.die_type = params[:type]
    @roll.user = helpers.current_user
    @roll.value = helpers.roll_die(@roll.die_type)
    @roll.save
    # Respond in JSON with the value of the roll
    respond_to do |format|
      body = { 'value': @roll.value }
      format.html { render :json => body }
    end
  end
end
