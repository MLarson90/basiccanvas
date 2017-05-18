var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = document.getElementById("myCanvas"),
    ctx = c.getContext("2d");

    var mouse = {
      x:undefined,
      y:undefined
    }
    maxRadius = 50;

window.addEventListener('click', function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});
window.addEventListener('resize', function(event){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

function Circle(x, y, dx, dy, radius){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius, 0 ,Math.PI*2);
    ctx.strokeStyle = "blue";
    ctx.fillStyle="lightblue";
    ctx.stroke();
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x+3,this.y-4,this.radius-6, 0 ,Math.PI*2);
    ctx.fillStyle="white";
    ctx.strokeStyle = "lightblue";
    ctx.stroke();
    ctx.fill();
  }
  this.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ) {
      this.dx = -this.dx;
    }
    if( this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    if(mouse.x > this.x - this.radius && mouse.x < this.x +this.radius &&  mouse.y > this.y - this.radius && mouse.y < this.y  + this.radius){
      if(this.radius< maxRadius){
      this.radius ++;
      }
      this.dx = this.dx + .5;
      this.dy = this.dy + .5;
      morecircles();
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();

  }
}
var circlesArray= [];
function init(){
morecircles = function(){
for(var i=0; i<2; i++){
  if(circlesArray.length<800){
  var radius =(Math.random() + .9) * 9;
  var x = Math.random() * (innerWidth -radius *2) + radius;
  var y = Math.random() * (innerHeight -radius *2) + radius;
  var dx = (Math.random() - 0.5) * 8;
  var dy = (Math.random() - 0.5) * 8;
  circlesArray.push(new Circle(x,y,dx,dy,radius));
}
}
}
for(var i=0; i<20; i++){
  var radius =(Math.random() + .9) * 9;
  var x = Math.random() * (innerWidth -radius *2) + radius;
  var y = Math.random() * (innerHeight -radius *2) + radius;
  var dx = (Math.random() - 0.5) * 8;
  var dy = (Math.random() - 0.5) * 8;
  circlesArray.push(new Circle(x,y,dx,dy,radius));
}
}
init();
function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0,0,innerWidth,innerHeight);
  for(var i =0; i<circlesArray.length; i++){
    circlesArray[i].update();
  }

}

animate();
