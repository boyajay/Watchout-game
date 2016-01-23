// start slingin' some d3 here.
var board = {
  height: 450,
  width: 700,
  nEnemies: 20,
  padding: "15px"
};

function randomX (){ return (Math.floor(Math.random()*(board.width - 35)));}
function randomY (){ return (Math.floor(Math.random()*(board.height-35)));}

var enemiesData;

function randomize () {

  enemiesData = [];
  for (var i = 0; i < 20; i++) {
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
                .selectAll('circle')
                .data(enemiesData)
                .enter()
                .append('circle')
                .attr('class', 'enemy')
                .attr('cx', function(d){ return d.x;})
                .attr('cy', function(d){return d.y;})
                .attr('r', 18)
                .on('mouseover', function(){console.log('hi');});

var drag = d3.behavior.drag()
              .on('drag', function() {
                heroChar.attr("cx", d3.event.x)
                .attr("cy", d3.event.y);
              });


var heroChar = svgBoard.selectAll('.hero')
        .data([{x: 375, y: 225}])
        .enter()
        .append('circle')
        .attr('class', 'hero')
        .attr('cx', 375)
        .attr('cy', 225)
        .attr('r', 20)
        .attr('fill', 'url(hero.png)')
        .call(drag);





window.setInterval(function(){
  var currentData = d3.select('.board').selectAll('.enemy')
    .data(enemiesData);
  // console.log(currentDats);  
  // console.log("interval");
  randomize();
  d3.select('.board').selectAll('.enemy')
    .transition()
    .attr("cx" , function(){return Math.random()*(board.width - 35);})
    .duration(1000)
    .attr("cy" , function(){return Math.random()*(board.height-35);})
    .duration(1000);

}, 1000);

var gameStats = {
  score: 0, 
  bestScore: 0,
  collision: 0
};

