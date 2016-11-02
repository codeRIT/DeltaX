class GameController < ApplicationController
  def show
  end

  def join
    @player = Player.new(code: SecureRandom.base64(10),x:0, y:0, z:0)
    #return player with valid code
    ActionCable.server.broadcast "game_channel", { action: :join, player: @player}
    render json: @player
  end

  def rejoin
    @player = Player.find_by_code(params[:code])
    ActionCable.server.broadcast "game_channel", { action: :rejoin, player: @player}
    render json: @player
  end
end
