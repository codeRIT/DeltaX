fb = FruitBasket = {players: [], plyr: {}, open: false, canvas : null, ctx: null, back: new Image(), oldBack: new Image(), gameLoop: null};

fb.init = function(cv){
  console.log("Starting a new FruitBasketGame ", $(cv));
  // Get the canvas element.
    this.canvas = $(cv).get(0);
      // Make sure you got it.
      if (this.canvas.getContext)

      // If you have it, create a canvas user interface element.
      {
        // Specify 2d canvas type.
        this.ctx = this.canvas.getContext("2d");

        // Paint it black.
        this.ctx.fillStyle = "whitesmoke";
        this.ctx.rect(0, 0, 1200, 800);
        this.ctx.fill();

        // Save the initial background.
        this.back = this.ctx.getImageData(0, 0, 30, 30);

        // Paint the starfield.
        //stars();

        // Draw the asteroids
        this.drawAsteroids();
        this.oldBack = this.ctx.getImageData(0, 0, 30, 30);
      }
      // Play the game until the until the game is over.

};

fb.add_player = function(player){
  if (this.open && (!(player.id in Game.plyr))) {
    //console.log("Adding Player to Game");
    player.currX = 30;
    player.currY = 30;
    player.points = 0;
    if (player.name) {
      var name = player.name;
    }else {
      var name = "";
    }
    var colora= this.get_random_color();
    var line = "<hr/><li id='player-"+ player.id+"' style='font-size:16px;background:white;color:"+colora+"'>Player (" + player.id + ") " +  name +" : <span class='score' style='color:red'>0</span></li>";
    $("#players").append(line);
    player.ship = fb.draw_player(colora,this.get_random_color());
    this.plyr[player.id] = (this.players.push(player) - 1); //HORRIBLE APPROACH FIX THIS!!!!
  }
};

fb.start = function(){
  console.log("The PLAY OF THE GAME!!");
  this.open = true;
  this.gameLoop = setInterval(this.doGameLoop.bind(this), 500);
};

fb.stop = function(){
  console.log("The END OF THE GAME!!");
  clearInterval(this.gameLoop);
};

fb.move = function(player){
  //handle move for player
  var p = this.players[this.plyr[player.id]];
  p.x = player.x;
  p.y = player.y;
  p.z = player.z;
  console.log("Moving Player", this.players[this.plyr[player.id]]);
};

fb.drawAsteroids = function() {
     // Draw asteroids.
     for (i = 0; i <= 40; i++) {
       // Get random positions for asteroids.
       var a = Math.floor(Math.random() * 1159);
       var b = Math.floor(Math.random() * 759);

       // Make the asteroids red
       this.ctx.fillStyle = "#FF0000";

       // Keep the asteroids far enough away from
       // the beginning or end.
       if (a > 40 && b > 40 && a < 1100 && b < 600) {

         // Draw an individual asteroid.
         this.ctx.beginPath();
         this.ctx.arc(a, b, 10, 0, Math.PI * 2, true);
         this.ctx.closePath();
         this.ctx.fill();
       } else--i;
     }
}

fb.draw_player = function(colora, colorb) {
  // Draw saucer bottom.
  this.ctx.beginPath();
  this.ctx.moveTo(28.4, 16.9);
  this.ctx.bezierCurveTo(28.4, 19.7, 22.9, 22.0, 16.0, 22.0);
  this.ctx.bezierCurveTo(9.1, 22.0, 3.6, 19.7, 3.6, 16.9);
  this.ctx.bezierCurveTo(3.6, 14.1, 9.1, 11.8, 16.0, 11.8);
  this.ctx.bezierCurveTo(22.9, 11.8, 28.4, 14.1, 28.4, 16.9);
  this.ctx.closePath();
  this.ctx.fillStyle = colora;
  this.ctx.fill();

  // Draw saucer top.
  this.ctx.beginPath();
  this.ctx.moveTo(22.3, 12.0);
  this.ctx.bezierCurveTo(22.3, 13.3, 19.4, 14.3, 15.9, 14.3);
  this.ctx.bezierCurveTo(12.4, 14.3, 9.6, 13.3, 9.6, 12.0);
  this.ctx.bezierCurveTo(9.6, 10.8, 12.4, 9.7, 15.9, 9.7);
  this.ctx.bezierCurveTo(19.4, 9.7, 22.3, 10.8, 22.3, 12.0);
  this.ctx.closePath();
  this.ctx.fillStyle = colorb;
  this.ctx.fill();

  // Save ship data.
  var ship = this.ctx.getImageData(0, 0, 30, 30);

  // Erase it for now.
  this.ctx.putImageData(this.oldBack, 0, 0);
  return ship;
}

fb.doGameLoop = function(){
  for (var i=0; i < this.players.length; i++) {
    var player = this.players[i];
    // Put old background down to erase shipe.
    this.ctx.putImageData(this.oldBack, player.currX, player.currY);

    this.players[i].currX += ( 10 * player.x);
    if (player.currX < 0) {
      player.currX = 1100;
    }
    else if (player.currX > 1200) {
      player.currX = 0;
    }
    this.players[i].currY += ( -10 * player.y);
    if (player.currY < 0) {
      player.currY = 580;
    }
    else if (player.currY > 580) {
      player.currY = 0;
    }

   // Collision detection. Get a clip from the screen.
   var clipWidth = 25;
   var clipDepth = 25;
   var clipLength = clipWidth * clipDepth;
   // alert(clipLength);
   var clipOffset = 5;
   var whatColor = this.ctx.getImageData(player.currX + clipOffset, player.currY + clipOffset, clipWidth, clipDepth);

   var pts = 0;
   // Loop through the clip and see if you find red or blue.
   for (var j = 0; j < clipLength * 4; j += 4) {
   if (whatColor.data[j] == 255) {
       pts += 1;
       break;
     }
   }

   this.players[i].points += pts;
   // Fourth element is alpha and we don't care.

    // update score board
    $("#player-" + player.id + " .score").html(player.points);
    // Put ship in new position.
    this.ctx.putImageData(player.ship, player.currX, player.currY);
  }
};

fb.get_random_color = function() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//Some contents copied from https://msdn.microsoft.com/en-us/library/gg589497(v=vs.85).aspx
