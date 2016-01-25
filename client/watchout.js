// start slingin' some d3 here.
var board = {
  height: 500,
  width: 800,
  padding: "15px"
};

var gameStats = [{
  score: 0, 
  highscore: 0
}];

var collisions= 0;
var currentScore = d3.select(".current");
var highScore = d3.select(".highscore");
var collisionCount = d3.select('.collisions');
var enemiesData;

function randomX (){ return (Math.floor(Math.random()*(board.width - 35)));}
function randomY (){ return (Math.floor(Math.random()*(board.height- 35)));}
function randomize () {
  enemiesData = [];
  for (var i = 0; i < 12; i++) {
    var enemy = {};
    enemy.x = randomX();
    enemy.y = randomY();
    enemiesData.push(enemy);
  }
}

var throttle = function(func, wait){
  var timer = false;
  var timerOff = function(){
    timer = false;
  };
  return function(){
    while(!timer) {
      timer = true;
      func.apply(null, arguments);
      setTimeout(timerOff, wait);
    }
  };
};
function collisionIncrement(){
  collisions++;
  $('body').css({"background-color": "#660000"});
  setTimeout(function(){$('body').css({"background-color": "#8c8c8c"});}, 350);
};
var throttledCollision = throttle(collisionIncrement, 1000);
var checkCollisions = function(){
  var collided = false;
  var userX = d3.selectAll(".hero").attr("x");
  var userY = d3.selectAll(".hero").attr("y");
  d3.selectAll('.enemy').each(function(d,i) {
    var enemy = d3.select(this);
    var enemyX = enemy.attr("x");
    var enemyY = enemy.attr("y");
    var distance = Math.sqrt(Math.pow(userX - enemyX, 2) + Math.pow(userY - enemyY, 2));
    if (distance < 45) {
      collided = true;
      updateScore();
      throttledCollision();
      collisionCount.select('span')
      .text(collisions);
    }
  });
  return collided;
};


var updateScore =function(){
    if (gameStats[0].score > gameStats[0].highscore) {
      gameStats[0].highscore = gameStats[0].score;
    }
    gameStats[0].score = 0;
    currentScore.select('span')
                .data(gameStats)
                .text(function(d) {return d.score;});
    highScore.select('span')
            .data(gameStats)
            .text(function(d) {return d.highscore;});
};

var svgBoard = d3.select('.board')
              .append('svg')
              .attr('width', 750)
              .attr('height', 450);

randomize();
var createEnemies = svgBoard
                .selectAll('image')
                .data(enemiesData)
                .enter()
                .append('image')
                .attr('x', function(d){ return d.x;})
                .attr('y', function(d){return d.y;})
                .attr('class', 'enemy')
                .attr('height', 55)
                .attr('width', 55)
                .attr("xlink:href", "imgs/tie.png");

$(document).ready(function() {
  $('.instructions').on('click', function(){
    $('.instructions').css('visibility', 'hidden'); starting();});
});

function starting (){
  var drag = d3.behavior.drag()
              .on('drag', function() {
                heroChar.attr("x", Math.max(0, Math.min(d3.event.x, 745)))
                .attr("y", Math.max(0, Math.min(d3.event.y, 445)))
                .style("transform", "rotate("+ ((Math.atan2(d3.event.dy, d3.event.dx))/(Math.PI)*180+270) + "deg)")
                .style("transform-origin", "50% 50%");
                //.style('visibility', 'hidden');
              });
  var heroChar = svgBoard.selectAll('.hero')
        .data([{x: 450, y: 300}])
        .enter()
        .append('image')
        .attr('class', 'hero')
        .attr('x', 370)
        .attr('y', 220)
        .attr('height', 55)
        .attr('width', 55)
        .attr('angle', 0)
        .attr("xlink:href", "imgs/hero.png")
        // .call(startgame)
        .call(drag);
  window.setInterval(function(){
    var currentData = d3.select('.board').selectAll('.enemy')
      .data(enemiesData);
    randomize();
    d3.select('.board').selectAll('.enemy')
      .data(enemiesData)
      .transition()
      .duration(2200)
      .attr('x', function(d){return d.x;})
      .attr('y', function(d){return d.y;});
      
  }, 1600);
  window.setInterval(function(){
    gameStats[0].score++;
      currentScore.select('span')
                  .data(gameStats)
                  .text(function(d) {return d.score;});
  }, 100);

  window.setInterval(function(){checkCollisions();}, 50);
}
