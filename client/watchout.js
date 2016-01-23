// start slingin' some d3 here.
var board = {
  height: 450,
  width: 700,
  nEnemies: 20,
  padding: "15px"
};

function randomX (){ return (Math.random()*(board.width - 35));}
function randomY (){ return (Math.random()*(board.height-35));}

var enemiesData;

function randomize () {

  enemiesData = [];
  for (var i = 0; i < board.nEnemies; i++) {
    var enemy = {};
    enemy.x = randomX();
    enemy.y = randomY();
    enemiesData.push(enemy);
  }
}


var heroes = {  
};

var hero = d3.select('.mouse');
console.log("hero is " + JSON.stringify(hero));

var drag = d3.behavior.drag()
  .on('drag', function() {
  hero.style("left", d.x=d3.event.x)
  .style("top", d.y=d3.event.y);
  });


d3.select('.mouse')
          .style('left', function(d){return d.x})
          .style('top', function(d){return d.y})
          .call(drag);


randomize();
var createEnemies = d3.select('.board')
                .selectAll('.enemy')
                .data(enemiesData)
                .enter()
                .append('svg')
                .attr('class', 'enemy')
                .style("left" , function(d){return d.x})
                .style("top" , function(d){return d.y})
                .on('mouseover', function(){console.log('hi');});



window.setInterval(function(){
  var currentData = d3.select('.board').selectAll('.enemy')
    .data(enemiesData);
  // console.log(currentDats);  
  // console.log("interval");
  randomize();
  d3.select('.board').selectAll('.enemy')
    .transition()
    .style("left" , function(){return Math.random()*(board.width - 35);})
    .duration(1000)
    .style("top" , function(){return Math.random()*(board.height-35);})
    .duration(1000);

}, 1000);

var gameStats = {
  score: 0, 
  bestScore: 0,
  collision: 0
};

