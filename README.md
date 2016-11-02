## Playing the Game

* host = “link-to running instance” 
* Join (GET): host/join (return player json)
  > Get request to retrieve a player for running game. Utilize this player instance to control game play.

* Set name (POST): host/player/set?code=”xYz” [name,]
  > Set player configurations such as name, x direction, y direction, z direction
* Rejoin (GET): host/rejoin?code=”xYz” (returns player json)
  > Rejoin running game instance with player code.
* Make moves (POST): host/player/set?code=”xYz” [name, x, y, z]
  > Change the direction of player/ship/object.

#### Current State:
  * Games Available:  1
