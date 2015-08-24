Rails.application.routes.draw do
  root 'player#index'
  get '/view/:country' => 'player#country'
end
