Rails.application.routes.draw do
  get 'player/:id', to: "players#show", as: :player
  get 'player/:id/validate', to: "players#validate", as: :player_validate # return {validity: "True"}
  post 'player/set', to: "players#set",  as: :set_player #set name, x, y, z
  #post 'player/:id/move', to: "players#move", as: :move_player #set name, x, y, z

  get 'join', to: "game#join"
  get 'rejoin', to: "game#rejoin", as: :game_rejoin

  root to: "game#show"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
