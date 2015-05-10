# class DilnaController < ApplicationController
#   before_action :authenticate_user!
#   layout 'hrad'
#
#   def tabule
#     flash.now.notice = 'Asi by bylo fajn postavit malou dílničku.'
#     render 'dilna/tabule'
#     session[:u_tabule] = Time.zone.now
#   end
#
#   def prostranstvi
#     projekt = params[:projekt]
#     if projekt.blank?
#       redirect_to dilna_tabule_path, alert: 'Na prostranství se nekouká, ale maká.. (jaký projekt?)'
#     else
#       render 'dilna/prostranstvi', locals: {projekt: projekt}
#     end
#   end
#
#   def stand_alone
#     render 'stand_alone', layout: false
#   end
#
# end