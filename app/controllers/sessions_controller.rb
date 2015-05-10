class SessionsController < Devise::SessionsController
  respond_to :json

  def after_sign_out_path_for(scope)
    brana_path
  end

end