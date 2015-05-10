class ApplicationController < ActionController::Base

  include ApplicationController::ExceptionHandling

  protect_from_forgery with: :exception


end
