class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_filter :set_mobile_device_option



  def set_mobile_device_option
  	@is_mobile = mobile_device?
  end

  private
  def mobile_device?
   if session[:mobile_param]
     session[:mobile_param] == "1"
   else
     request.user_agent =~ /Mobile|webOS/
   end
end
end
