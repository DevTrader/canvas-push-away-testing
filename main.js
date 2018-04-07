//Added lines:11-37; 47-50(random color); 75-84; 93-95(init function); 

let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');
console.log(c);

let maxRadius = 35; 
//let minRadius = Math.random() * 8 + 1;

let colorArray = [
	'#69F4BD',
	'#319589',
	'#344D6C',
	'#372650',
	'#3E1B3C',
]

let mouse = {
	x:undefined,
	y:undefined
}
// Mouse event listener, updates mouse object with current mouse coordinates
window.addEventListener('mousemove', function(event){
	mouse.x = event.x;
	mouse.y = event.y;
})

//Resizing window
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init();
})

//Create Circle Object with parameters:

function Circle(x, y, dx, dy, radius){
	//parameter values
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;//Store original radius to be used on shrink
	// Getting a random color from colorArray
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

	//Method, if you call Circle.draw(), this will fire and draw the circle
	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		//c.strokeStyle = 'red';
		//c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}

	// Gets the limits of the window and increments x and y positions (this was in the animate function on project 03) 
	this.update = function(){
		if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ){
			this.dx = -this.dx;
		}

		if(this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

//------//Interactivity

		if (mouse.x - this.x < 110 && mouse.x - this.x > -110 && mouse.y - this.y < 110 && mouse.y - this.y > -110) {
			
				// this.dx = this.dx * -1;
				// this.dy = this.dy * -1;

        if(this.dx > 0 && this.dy > 0){
          this.x = this.x + 5;
          this.y = this.y - 3;

        }else{
          this.x = this.x - 3;
          this.y = this.y + 5;

        }
        
      
         
      }
    this.draw();
		}	
	}

//Init (for auto generating circles on resize), gets called on resize and once on startup.
let circleArray = []

function init(){
	//Resets circle array as part of the init
	circleArray = [];

	for(let i = 0; i < window.innerWidth/1.5; i++){
		let x, y, dx, dy, radius;

		radius = Math.random() * 7 + 1; // Absolute minimum is now 1
		x = Math.random() * (innerWidth - radius * 2) + radius; // so it doesnt spawn beyond the canvas limits;
		y = Math.random() * (innerHeight - radius * 2) + radius;
		dx = (Math.random() - 0.5) * 2;
		dy = (Math.random() - 0.5) * 2;
		
		circleArray.push(new Circle(x, y, dx ,dy, radius)) // creates new circle with randomized parameters and pushes it into the circleArray
	}

}

// Animation
function animate(){
	requestAnimationFrame(animate); //recursion loop

	c.clearRect(0, 0, innerWidth, innerHeight); // this clears the canvas from 0 to innerDimension so the circle isn't drawn multiple times;

	for(let i = 0; i < circleArray.length; i++){
		circleArray[i].update();
	}
	

}

init();

animate();