// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  vx = 0;
  vy = 1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}



function draw() {
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // BLANK[1] キャラクターの左右移動
  if (keyIsDown(LEFT_ARROW)) { x -= 1; }
  if (keyIsDown(RIGHT_ARROW)) { x += 1; }
  if (keyIsDown("A".charCodeAt(0))) { x += 31;}
  if (keyIsDown("S".charCodeAt(0))) { x -= 31;}


  // BLANK[2] 重力とジャンプ

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;
  y += vy;

  x = constrain(x, 0, width);
  y = constrain(y, groundY - size/2 - size, groundY - size / 2);

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}

function keyPressed() {
  if (key == " ") {y = y - size;}
}