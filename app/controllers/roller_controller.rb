class RollerController < ApplicationController

  DIE_TYPES = ['D4', 'D6', 'D8', 'D10', 'D12', 'D20', 'D100']

  # If there is no logged in user, redirect to the login page.
  def index
    unless helpers.logged_in?
      redirect_to root_path
    end
    @die_types = DIE_TYPES
  end

  # Create a new Roll in the DB and return the value of the roll
  # via helper function.
  def roll
    # Create roll and assign params to fields
    @roll = Roll.new
    @roll.die_type = params[:type]
    @roll.user = helpers.current_user
    @roll.value = helpers.roll_die(@roll.die_type)
    @roll.info = params[:info]
    @roll.save
    # Redirect to the same page with new information to show
    redirect_to roller_path, flash: { roll_result: @roll.value, radio_selection: @roll.die_type }
  end
end
