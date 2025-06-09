let player;
let lixos = [];
let arvores = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 400);
  player = new Player();
  for (let i = 0; i < 5; i++) {
    lixos.push(new Lixo());
    arvores.push(new Arvore());
  }
}

function draw() {
  background(100, 200, 255);
  drawEnvironment();
  player.show();
  player.move();

  if (!gameOver) {
    for (let lixo of lixos) {
      lixo.move();
      lixo.show();
      if (player.collect(lixo)) {
        score += 10;
        lixo.reset();
      }
    }

    for (let arvore of arvores) {
      arvore.show();
    }

    fill(0);
    textSize(20);
    text("Pontuação: " + score, 10, 30);
  } else {
    fill(255, 0, 0);
    textSize(40);
    text("Fim de Jogo - Pontuação Final: " + score, 100, height / 2);
  }
}

function keyPressed() {
  if (key === ' ') {
    gameOver = !gameOver;
  }
}

function drawEnvironment() {
  fill(50, 200, 70);
  rect(0, height - 50, width, 50);
}

// Classes
class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.size = 40;
  }

  show() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, this.size);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) this.x -= 15;
    if (keyIsDown(RIGHT_ARROW)) this.x += 15;
    this.x = constrain(this.x, 0, width);
  }

  collect(obj) {
    let d = dist(this.x, this.y, obj.x, obj.y);
    return d < (this.size + obj.size) / 2;
  }
}

class Lixo {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(width);
    this.y = random(-300, -50);
    this.size = 30;
  }

  move() {
    this.y += 2;
    if (this.y > height) {
      gameOver = true;
    }
  }

  show() {
    fill(150);
    rect(this.x, this.y, this.size, this.size);
  }
}

class Arvore {
  constructor() {
    this.x = random(width);
    this.y = height - 80;
  }

  show() {
    fill(139, 69, 19);
    rect(this.x, this.y, 10, 30);
    fill(34, 139, 34);
    ellipse(this.x + 5, this.y, 40, 40);
  }
}