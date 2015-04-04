class HradController < ApplicationController

  protect_from_forgery with: :null_session
  before_action :vykopni_neprihlasene
  layout false

  def hrad

  end

  private

  def vykopni_neprihlasene
    current_user || redirect_to(brana_path)
  end

end
