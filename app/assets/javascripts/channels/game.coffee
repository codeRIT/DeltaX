$ ->
  App.game = App.cable.subscriptions.create "GameChannel",
    connected: ->
      # Called when the subscription is ready for use on the server

    disconnected: ->
      # Called when the subscription has been terminated by the server

    received: (data) ->
      switch data.action
        when 'join'
          if Game.open
            @join data.player
        when 'rejoin'
          if Game.open
            @add data.player
        when 'add'
          @add data.player
        when 'move'
          @move data.player
        when 'announce'
          @announce data.message
      console.log data
      # Called when there's incoming data on the websocket for this channel

    join: (player) ->
      #checks on server side if player is valid and then joins if possible
      @perform 'join', player: player

    add: (player) ->
      #adds valid player to game
      if !(player.id in Game.plyr)
        Game.add_player player

    start: ->
      console.log "kjdbkjdbalbd"
      Game.init "#gboard"
      Game.start()
      #@perform 'start'

    stop: ->
      Game.stop()
      #@perform 'stop'

    move: (player) ->
      Game.move player

    announce: (message) ->
      console.log message
