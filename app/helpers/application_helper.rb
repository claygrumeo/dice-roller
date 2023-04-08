module ApplicationHelper

  def logged_in?
    puts session[:user_id] || "none"
    !!session[:user_id]
  end

  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if !!session[:user_id]
  end
end
