class RollsController < ApplicationController

  # Populate the rolls that will be listed on the page
  def index
    @user = helpers.current_user
    @rolls = @user.rolls.order(created_at: :desc)
    @rolls_count = @rolls.count
  end
end
