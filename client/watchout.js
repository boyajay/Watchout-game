// start slingin' some d3 here.
var board = {
  height: 600,
  width: 900,
  nEnemies: 12,
  padding: "15px"
};

function randomX (){ return (Math.floor(Math.random()*(board.width - 35)));}
function randomY (){ return (Math.floor(Math.random()*(board.height-35)));}

var enemiesData;

function randomize () {

  enemiesData = [];
  for (var i = 0; i < 12; i++) {
    var enemy = {};
    enemy.x = randomX();
    enemy.y = randomY();
    enemiesData.push(enemy);
  }
}

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
                .attr('class', 'enemy')
                .attr('x', function(d){ return d.x;})
                .attr('y', function(d){return d.y;})
                .attr('height', 55)
                .attr('width', 55)
                .attr("xlink:href", "tie.png")
                .on('mouseover', function(){console.log('hi');});

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





window.setInterval(function(){
  var currentData = d3.select('.board').selectAll('.enemy')
    .data(enemiesData);
  // console.log(currentDats);  
  // console.log("interval");
  randomize();
  d3.select('.board').selectAll('.enemy')
    .transition()
    .attr("x" , function(){return Math.random()*(board.width - 35);})
    .duration(1000)
    .attr("y" , function(){return Math.random()*(board.height-35);})
    .duration(1000);

}, 1000);

var gameStats = {
  score: 0, 
  bestScore: 0,
  collision: 0
};

