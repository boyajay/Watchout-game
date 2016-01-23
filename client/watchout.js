// start slingin' some d3 here.
var board = {
  height: 600,
  width: 900,
  nEnemies: 12,
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
function randomY (){ return (Math.floor(Math.random()*(board.height-35)));}
function randomize () {

  enemiesData = [];
  for (var i = 0; i < 20; i++) {
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
var Collision = function(){
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
      collisions++;
      collisionCount.select('span')
      .text(collisions);
    }
  });
  return collided;
};
var checkCollision = throttle(Collision, 200);

var updateScore =function(){
    if (gameStats[0].score > gameStats[0].highscore) {
      gameStats[0].highscore = gameStats[0].score;
    }
    gameStats[0].score = 0;
    currentScore.select('span')
                .data(gameStats)
                .text(function(d) {return d.score + "s";});
    highScore.select('span')
            .data(gameStats)
            .text(function(d) {return d.highscore + "s";});
};

randomize();

var svgBoard = d3.select('.board')
              .append('svg')
              .attr('width', 750)
              .attr('height', 450);
var drag = d3.behavior.drag()
              .on('drag', function() {
                heroChar.attr("x", d3.event.x)
                .attr("y", d3.event.y);
              });
var heroChar = svgBoard.selectAll('.hero')
        .data([{x: 375, y: 225}])
        .enter()
        .append('image')
        .attr('class', 'hero')
        .attr('x', 375)
        .attr('y', 225)
        .attr('height', 55)
        .attr('width', 55)
        .attr("xlink:href", "hero.png")
        .call(drag);
var createEnemies = svgBoard
                .selectAll('image')
                .data(enemiesData)
                .enter()
                .append('image')
                .attr('class', 'enemy')
                .attr('x', function(d){ return d.x;})
                .attr('y', function(d){return d.y;})
                .attr('height', 55)
                .attr('width', 55)
                .attr("xlink:href", "tie.png");

window.setInterval(function(){
  var currentData = d3.select('.board').selectAll('.enemy')
    .data(enemiesData);
  randomize();
  d3.select('.board').selectAll('.enemy')
    .data(enemiesData)
    .transition()
    .duration(1500)
    .attr('x', function(d){return d.x;})
    .attr('y', function(d){return d.y;});
    gameStats[0].score++;
    currentScore.select('span')
                .data(gameStats)
                .text(function(d) {return d.score + "s";});
}, 1500);

window.setInterval(function(){checkCollision();}, 50);

