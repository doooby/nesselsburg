class DilnaController < ApplicationController
  layout 'dilna'

  def tabule
    render 'dilna/tabule'
  end

  def prostranstvi
    n = Dilna::Naradi.from_params params
    view = case n.cinnost
             when 'dama', 'posun_blok', 'self_chat'
               n.cinnost
             else
               flash[:alert] = 'Vyber činnost. Pokud se chceš flákat, tak proboha přestan čumět do pc.'
               return redirect_to(action: 'tabule')
           end
    render view, locals: {naradi: n}
  end
end