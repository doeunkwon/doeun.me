const particles = [];
let mouseOverCanvas = false;
let restitution = {
  x: 0.5,
  y: 0.5,
}
let force = 0.5;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.size = random(1, 2);
    this.color = color(random(255), random(255), random(255));
  }

  update() {
    if (mouseOverCanvas) {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const distance = sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        this.vx += dx / distance * force;
        this.vy += dy / distance * force;
      }
    }
    
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x <= 0 || this.x >= width) {
      this.vx *= -restitution.x;
      this.x = constrain(this.x, 0, width);
    }
    if (this.y <= 0 || this.y >= height) {
      this.vy *= -restitution.y;
      this.y = constrain(this.y, 0, height);
    }
  }

  display() {
    fill(this.color);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

function setup() {
  const container = select("#particle-system-container");
  const containerWidth = container.width;
  const canvas = createCanvas(containerWidth, containerWidth);
  canvas.parent("particle-system-container");
  canvas.mouseOver(() => {
    mouseOverCanvas = true;
  });
  canvas.mouseOut(() => {
    mouseOverCanvas = false;
    for (let particle of particles) {
      particle.vx += random(-1, 1);
      particle.vy += random(-1, 1);
    }
  });
  for (let i = 0; i < 5000; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function windowResized() {
  const container = select("#particle-system-container");
  const containerWidth = container.width;
  resizeCanvas(containerWidth, containerWidth);
}

function draw() {
  background(0);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
  }
}
