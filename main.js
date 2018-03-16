//prototypal inheritance



// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var balls = [];

// function to generate random number

function random(min, max) {
    var num = Math.floor(Math.random() * (max - min)) + min;
    return num;
}

function Ball(x, y, velX, velY, color, size) {
    this.radius = 
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
    this.mass = this.radius * this.radius * this.radius;

    this.speed = function() {
        // magnitude of velocity vector
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    };
    this.angle = function() {
        //angle of ball with the x axis
        return Math.atan2(this.dy, this.dx);
    };
    this.kineticEnergy = function () {
    //  not rly used for computation.
        return (0.5 * this.mass * this.speed() * this.speed());
    };
    this.onGround = function() {
        return (this.y + this.radius >= canvas.height)
    }
}
Ball.prototype.draw = function () {

    //declaring that we wish to draw something on the paper (canvas)
    ctx.beginPath();
    ctx.fillStyle = this.color;

    //this creates the circle/Arc
    //2 * PI will give us 360 degrees in radians. So, in shorthand a circle
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

    //fill will take the path we have drawn and then fill it with a color that we secified earlier. 
    ctx.fill();

}

Ball.prototype.update = function () {
    for (var j = 0; j < balls.length; j++) {
        //Including the size variable makes it so the edge of the ball is what the update function looks for. 
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            //Checking for wall on the right side of the canvas
            if ((this.x + this.size) >= width) {
                this.velX = -(this.velX);
            }
            //Checking for wall on the left side of the canvas
            if ((this.x - this.size) <= 0) {
                this.velX = -(this.velX);
            }
            //checking for wall on the top side
            if ((this.y + this.size) >= height) {
                this.velY = -(this.velY);
            }
            //Checking for wall on the bottom side
            if ((this.y - this.size) <= 0) {
                this.velY = -(this.velY);
            }

            if (distance < this.size + balls[j].size) {
                this.velY = -(this.velY);
                this.velX = -(this.velX);
                
            }
            //the last two lines draws the ball again in a different position effectively moving the ball
            this.x += this.velX;
            this.y += this.velY;
        }
    }
}


Ball.prototype.collisionDetect = function () {
    //for each ball we need to check to see if there is another ball that has collided with the current ball.
    // in order to do this we need to loop through the balls in the balls[] array.
    for (var j = 0; j < balls.length; j++) {

        //the first thing we are doing is checking whether the current ball we are on is the ball that we are checking
        //this if statement wont run if we that is the case. 
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            //then we use a (what they call) common algorithim to see if the two areas of the circles overlap. 
            //if collision is detected the code in side the if statement will run

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
}

function loop() {
    //the fillStyle creates a semi transparent black
    ctx.fillStyle = 'rgba(0,0,0,0.25)';

    //the fill rect draws a black rectangle over the previous frame every loop so that the previous drawn ball disapears
    //thus making it appear like there is fluid movement.
    //if you did not do this than you would end up with a snaking pattern.
    ctx.fillRect(0, 0, width, height);



    while (balls.length < 20) {
        var ball = new Ball(
            random(0, width),
            random(0, height),
            random(-7, 7),
            random(-7, 7),
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            random(10, 40)
        );
        //pushes our ball into an array - as long as there are less than 25 balls on the screen
        balls.push(ball);
    }

    for (var i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    //when this method is called 

    requestAnimationFrame(loop);
}

loop();

// var testBall = new Ball(50, 100, 4, 4, 'blue', 10);

// testBall.x
// testBall.size
// testBall.color
// testBall.draw();