const particles = [];

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.life = 255;
    this.size = 1;
    this.color = "lime";
  }

  update() {
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      const force = 0.5;
      this.vx += (dx / distance) * force;
      this.vy += (dy / distance) * force;
    }
    
    this.x += this.vx;
    this.y += this.vy;
    
    this.vx *= 0.95;
    this.vy *= 0.95;
    
    this.life -= 2;
  }

  display() {
    push();
    const c = color(this.color);
    c.setAlpha(this.life);
    fill(c);
    noStroke();
    ellipse(this.x, this.y, this.size);
    pop();
  }

  isDead() {
    return this.life <= 0;
  }
}

function setup() {
  const container = select("#particle-system-container");
  const containerWidth = container.width;
  const canvas = createCanvas(containerWidth, containerWidth);
  canvas.parent("particle-system-container");
}

function windowResized() {
  const container = select("#particle-system-container");
  const containerWidth = container.width;
  resizeCanvas(containerWidth, containerWidth);
}

function draw() {
  background(0);
  
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(mouseX + random(-5, 5), mouseY + random(-5, 5)));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}
