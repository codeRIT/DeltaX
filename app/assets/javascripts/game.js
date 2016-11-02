(function() {
  this.Game || (this.Game = {});
  Game = FruitBasket;
}).call(this);

$(document).on("click", "#start", function(){
   // do something here
   App.game.start();
   console.log("Start Game");
});


$(document).on("click", "#stop", function(){
   // do something here
   App.game.stop();
   console.log("Stop Game");
});
