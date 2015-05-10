Rails.application.routes.draw do

  constraints format: :html do
    get 'brana' => 'predhradi#brana', as: 'brana'
    get 'vyveska' => 'predhradi#vyveska', as: 'vyveska'
    get 'zed' => 'predhradi#zed', as: 'zed'

    get 'hrad' => 'hrad#hrad'
    namespace :hrad do
      # get :nadvori
    end

    # namespace :dilna do
    #   get 'tabule'
    #   match 'prostranstvi', via: :all
    #   get 'stand_alone'
    # end

  end

  devise_for :users, skip: %i(sessions)
  devise_scope :user do
    post '/login' => 'sessions#create', format: true, constraints: {format: :json}
    delete '/logout' => 'sessions#destroy', constraints: {format: :html}
  end

  # constraints format: :js do
  # namespace :games do
  #   get :data
  #   get :any_data
  #   get :any_keys
  #   post :store_data
  # end
  # end

  root 'hrad#hrad'

end
