module ApplicationHelper

  # Helper to tell when there is a user logged in.
  def logged_in?
    puts session[:user_id] || "none"
    !!session[:user_id]
  end

  # Helper to access the current user.
  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if !!session[:user_id]
  end

  # Helper that takes a die type ('D6', 'D8', 'D20', etc.)
  # and returns a random number that can be rolled on that die.
  def roll_die(type)
    max = type[1..-1]
    max = max.to_i
    rng = Random.new
    return rng.rand(1..max)
  end
end
