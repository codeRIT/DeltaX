class PlayersController < ApplicationController
  def show
    @player = Player.find(params[:id])
  end

  def set
    if player = Player.find_by_code(params[:code])
      player.name = params[:name]
      if !params[:x].blank?
          player.x = params[:x]
      end
      if !params[:y].blank?
          player.y = params[:y]
      end
      if !params[:z].blank?
          player.z = params[:z]
      end
      ActionCable.server.broadcast "game_channel", { action: :move, player: player}
      player.save!
    end
    render json: {}
  end

  def validate
    #{ expects player id and player code}
    if player = Player.find(params[:id])
      return player.code == params["code"]
    end
    return false
  end

end
