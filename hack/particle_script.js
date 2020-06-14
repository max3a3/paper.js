var MATH_PROPS = 'E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min'.split( ' ' );
var M = Math;
TWO_PI= M.PI * 2
HALF_PI= M.PI / 2
QUARTER_PI= M.PI / 4

// todo what to do with context[MATH_PROPS] currently installed to window
for ( var i = 0; i < MATH_PROPS.length; i++ )

  self[ MATH_PROPS[i] ] = M[ MATH_PROPS[i] ];
function isArray( object ) {

  return Object.prototype.toString.call( object ) == '[object Array]';
}

function isFunction( object ) {

  return typeof object == 'function';
}

function isNumber( object ) {

  return typeof object == 'number';
}

function isString( object ) {

  return typeof object == 'string';
}

random = ( min, max ) => {

  if ( isArray( min ) )

    return min[ ~~( M.random() * min.length ) ];

  if ( !isNumber( max ) )

    max = min || 1, min = 0;

  return min + M.random() * ( max - min );
}

lerp = ( min, max, amount ) =>{

  return min + amount * ( max - min );
}

map= ( num, minA, maxA, minB, maxB )=> {

  return ( num - minA ) / ( maxA - minA ) * ( maxB - minB ) + minB;
}


class Particle {
//   circle = null;

  init(x, y, radius) {
    this.alive = true;
    this.radius = radius || 10;
    this.wander = 0.15;
    this.theta = random(TWO_PI);
    this.drag = 0.92;
    this.color = '#fff';
    this.x = x || 0.0;
    this.y = y || 0.0;
    this.vx = 0.0;
    this.vy = 0.0;

  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= this.drag;
    this.vy *= this.drag;
    this.theta += random(-0.5, 0.5) * this.wander;
    this.vx += sin(this.theta) * 0.1;
    this.vy += cos(this.theta) * 0.1;
    this.radius *= 0.96;
    this.alive = this.radius > 0.5;

  }

  draw() {
    if (!this.circle)
      this.circle = new Path.Circle({
        center: [this.x, this.y],
        radius: this.radius,
        fillColor: this.color,
      });
    else {
      this.circle.position = [this.x, this.y]
      this.circle.fillColor = this.color
    }

    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
    // ctx.fillStyle = this.color;
    // ctx.fill();

  }
}


const MAX_PARTICLES = 90;
const COLOURS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];


class ParticleDemo {

  constructor() {

    this.particles = []; //live particles
    this.pool = [];// cache of dead Particle object
    // to replace with paper view property
    let width = 400
    let height = 400

    for (let i = 0; i < 20; i++) {
      let x = (width * 0.5) + random(-100, 100);
      let y = (height * 0.5) + random(-100, 100);
      this.spawn(x, y);
    }
  }
  spawn(x, y) {

    if (this.particles.length >= MAX_PARTICLES)
      this.pool.push(this.particles.shift());

    let particle = this.pool.length ? this.pool.pop() : new Particle();
    particle.init(x, y, random(5, 40));
    particle.wander = random(0.5, 2.0);
    particle.color = random(COLOURS);
    particle.drag = random(0.9, 0.99);
    const theta = random(TWO_PI);
    const force = random(2, 8);
    particle.vx = sin(theta) * force;
    particle.vy = cos(theta) * force;
    this.particles.push(particle);
  };
  update() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let particle = this.particles[i];
      if (particle.alive)
        particle.move();
      else
        this.pool.push(this.particles.splice(i, 1)[0]);
    }
  };

  draw() {
    // this.demo.globalCompositeOperation = 'lighter';
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].draw();
    }
  };

  mousemove(event) {
    let max = random(1, 4);
    for (let j = 0; j < max; j++) {
      this.spawn(event.point.x, event.point.y);
    }

  };

}

particle_demo = new ParticleDemo()
tool.onMouseDrag = (event) => {
  particle_demo.mousemove(event)

};
tool.onActivate = () =>{
    console.log("particle tool activate called, need to recreate the list of particle here")

}
tool.onFrame = (event) =>{
  onFrame(event)
}

function onFrame(event) {
  particle_demo.update()
  particle_demo.draw()
}
module.exports={customTool:tool}
