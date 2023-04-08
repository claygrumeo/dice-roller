class SessionsController < ApplicationController

  def create
    @user = User.find_by(email: params[:email])
    if !!@user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      redirect_to roller_path
    else
      message = "Email or password is incorrect. Please try again."
      redirect_to login_path, notice: message
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path
  end

end