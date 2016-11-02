# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class GameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "game_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def join(data)
    player = Player.new(data['player'])
    if player.save!
      ActionCable.server.broadcast "game_channel", action: :add, player: player
      ActionCable.server.broadcast "game_channel", action: :announce, message: "New Player: Player (#{player.id}) #{player.name} has joined"
    end
  end

  def start
  end

  def stop
  end
end
