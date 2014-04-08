class DilnaController < ApplicationController
  layout 'dilna'

  def tabule
    render 'dilna/tabule'
  end

  def prostranstvi
    n = Dilna::Naradi.from_params params
    view = case n.cinnost
             when 'dama'
               n.cinnost
             else
               flash[:alert] = 'pokud se chceš flákat, tak proboha přestan čumět do pc'
               return redirect_to(action: 'tabule')
           end
    render view
  end
end